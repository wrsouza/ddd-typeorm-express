---
name: ddd-verify
description: Verification checklist to run before reporting any change to this repository (ddd-test) as done — type-check, boot the server, and hit the real endpoints with curl. Always load this last, regardless of which layer(s) you changed (domain, infra, application, presentation), whether you came from ddd-orchestrator or made a small one-off edit.
---

# Verify before declaring done

This project's working convention: **never report a change as complete
without actually running it.** Type-checking alone is not enough — this
codebase has caught real bugs (a broken endpoint, a leftover `console.log`, a
missing re-export) that only showed up by booting the app and calling it.

## 1. Type-check

```bash
npx tsc --noEmit --types node --skipLibCheck
```

Compare the output against `ARCHITECTURE.md` §9 ("Erros conhecidos"), which
lists the pre-existing/unrelated errors as of the last time it was updated.
Any error **not** already documented there is yours to fix before moving on.
If you fix a previously-documented one, update that section of
`ARCHITECTURE.md` to remove it.

## 2. Boot the app for real

```bash
rm -f database.db
(npx tsx src/index.ts > /tmp/server.log 2>&1 &)
sleep 6   # seeding needs real time; 4s has produced false "login failed" flakes before — always wait at least 6s
grep -iE "error" /tmp/server.log   # should be empty
tail -5 /tmp/server.log            # should show "seeds completed" and "Server running on port 3000"
```

## 3. Exercise the actual HTTP path

Get a token first if any changed/new route is guarded:

```bash
EMAIL=$(sqlite3 database.db 'SELECT email FROM employees LIMIT 1;')
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"123456\"}" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['token'])")
```

Then hit every new/changed endpoint, checking both status code and that the
response body has the shape you intended:

```bash
curl -s -o /dev/null -w "GET /foos HTTP:%{http_code}\n" "http://localhost:3000/foos" -H "Authorization: Bearer $TOKEN"
curl -s "http://localhost:3000/foos/<id>" -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
```

If you changed something order/money-related, specifically look for dirty
floats in the output (`2008.8000000000002`-style) — that's the exact bug
class the `Money` value object exists to prevent; a reappearance means
something now bypasses it.

Also sanity-check the negative path where it matters: no token → `401`;
invalid id → `404`, not a `500` crash.

## 4. Clean up

```bash
pkill -f "tsx src/index.ts" 2>/dev/null
rm -f /tmp/server.log database.db
```

Don't leave a background server running or a modified `database.db` behind.

## 5. Report

State plainly: what layers/files changed, what you actually ran to verify
(not just "should work"), the real status codes/output you saw, and anything
you deliberately left out of scope. If you skipped a step in this checklist
for a good reason (e.g. a docs-only change with no runtime effect), say so
explicitly instead of silently omitting it.
