---
name: ddd-orchestrator
description: Entry point for any work on this repository (ddd-test) — adding a domain/entity/resource, a CRUD, an endpoint, or changing an existing one. Figures out which layers are affected and loads only the matching per-layer skill(s) (ddd-domain-layer, ddd-infra-layer, ddd-application-layer, ddd-presentation-layer, ddd-verify) instead of one giant skill. Use this first for any "add X" / "implement Y" / "novo domínio" / "novo endpoint" request before touching files.
---

# DDD orchestrator (this project's pattern)

This is the router, not the instructions. It tells you *which* smaller skill(s)
to load next via the `Skill` tool — it does not itself contain the file-by-file
recipes. Load only what the task needs; don't pull in a layer skill you won't
touch.

The authoritative long-form doc is `ARCHITECTURE.md` at the repo root. Every
skill in this family is a condensed extract of it. If a skill and
`ARCHITECTURE.md` disagree, the doc wins.

## Step 1 — classify the task

- **New domain / new resource from scratch** ("add a Foo entity with CRUD",
  "novo domínio X") → touches all 4 layers, in order. Load, in this order,
  invoking each with the `Skill` tool right before you start that layer's
  files (not all up front):
  1. `ddd-domain-layer`
  2. `ddd-infra-layer`
  3. `ddd-application-layer`
  4. `ddd-presentation-layer`
  5. `ddd-verify` (always last, regardless of scope)

- **Change confined to one layer** ("add a field to the Order entity",
  "add a new repository filter", "change what the order endpoint returns")
  → load only that layer's skill, plus `ddd-verify` at the end. Do not load
  the other three.

- **Vertical slice that isn't plain CRUD** ("add an endpoint to add an item to
  an existing order") → this usually touches: a new method on a `domain`
  aggregate (load `ddd-domain-layer`), a new orchestration method in
  `application` (load `ddd-application-layer`), and a new facade
  method + controller route in `presentation` (load `ddd-presentation-layer`).
  Infra is only needed if new persistence is required — check before loading
  `ddd-infra-layer`. Always end with `ddd-verify`.

- **Unclear which layers are affected** → read `ARCHITECTURE.md` §1–§5 first
  (the per-layer overview), then re-classify. Don't guess by loading everything.

## Step 2 — the one rule that spans every layer (memorize this, don't reload it per-layer)

```
presentation ──▶ application ──▶ domain
      │                              ▲
      └───────────▶ infra ───────────┘
```

`domain` imports nothing from the other three (only `common/exceptions`).
`application` imports `domain` + `infra`, never `presentation`. `infra`
imports `domain` + external libs, never `application`/`presentation`.
`presentation` imports `application` (and occasionally a pure technical
`infra/services/*` like `JwtService`, never a repository/mapper directly).

## Step 3 — the one naming rule that spans every layer

DI tokens and interface names must say which layer they're from:

| Layer        | Token suffix              | Example                      |
|--------------|----------------------------|-------------------------------|
| infra        | `_REPOSITORY`, `_MAPPER`   | `"FOO_REPOSITORY"`            |
| application  | `_APPLICATION_SERVICE`     | `"FOO_APPLICATION_SERVICE"`   |
| presentation | `_FACADE`, `_FILTER`       | `"FOO_FACADE"`                |

A bare `IFooService` / `"FOO_SERVICE"` that doesn't say which layer is a
naming bug this project already paid to fix once — never reintroduce it.

## Step 4 — after every layer skill you load, act on it before loading the next

Don't batch-read all the layer skills and then start writing. Load
`ddd-domain-layer`, write those files, then load `ddd-infra-layer`, write
those, and so on. This keeps each skill's instructions fresh in context right
when they're needed instead of stale by the time you get to that layer.

## Step 5 — always finish with `ddd-verify`

Regardless of how small the change was, load `ddd-verify` and run its
checklist before telling the user anything is done. No exceptions — this
project's history has a running theme of "reported done" without actually
booting the server, and it's not acceptable here.
