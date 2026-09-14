# Instructions for AI assistants working in this repository

This is a DDD/Clean Architecture example project. The architecture is strict
and deliberate — see [ARCHITECTURE.md](ARCHITECTURE.md) for the full
reference. Do not improvise a different shape "because it's simpler."

## Use the `ddd-builder` agent for any development work

For any feature, module, CRUD, endpoint, or refactor in this codebase
(anything that touches `src/`), **delegate to the `ddd-builder` subagent**
instead of writing the layers yourself:

```
Agent({
  subagent_type: "ddd-builder",
  description: "<short task description>",
  prompt: "<the actual task, with full context — this agent starts cold>",
})
```

`ddd-builder` already knows to invoke the `ddd-orchestrator` skill, load only
the per-layer skills the task needs (`ddd-domain-layer`, `ddd-infra-layer`,
`ddd-application-layer`, `ddd-presentation-layer`), and always finish with
`ddd-verify` (type-check + boot the real server + `curl` the endpoints)
before reporting done. Don't re-derive that workflow yourself — delegate.

**Exception**: a genuinely trivial, single-line, single-file fix (typo, a
missing import, a config value) doesn't need the agent — just do it, then
still run `npx tsc --noEmit --types node --skipLibCheck` before calling it
done.

## If you're not using the Agent tool right now

If you're working directly in this session instead of spawning `ddd-builder`
(e.g. the harness you're running in doesn't support subagents), invoke the
`ddd-orchestrator` skill yourself first — it routes you to the right
per-layer skill(s) and always ends with `ddd-verify`. Same rules apply either
way; the agent is a convenience wrapper around the same skills, not a
different standard.

## Non-negotiables (the skills cover these in detail, this is just the summary)

- Dependency direction: `presentation → application → domain`,
  `infra → domain`. `domain` imports nothing else business-layer.
- Business rules and invariants live in `domain` entities (constructor
  validation, named methods) — never in an application service, facade, or
  controller.
- DI tokens/interfaces say which layer they're from:
  `*_REPOSITORY`/`*_MAPPER` (infra), `*_APPLICATION_SERVICE` (application),
  `*_FACADE`/`*_FILTER` (presentation). Never a bare `IFooService`.
- Never report a change as done without actually compiling, booting the app,
  and hitting the changed endpoints with `curl`. "Should work" is not a
  verification.

Full detail, file-by-file recipes, and the project's known/accepted technical
debt: [ARCHITECTURE.md](ARCHITECTURE.md). Human-facing overview and how to
run the project: [README.md](README.md).
