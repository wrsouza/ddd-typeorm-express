---
name: ddd-domain-layer
description: How to add or change code in src/domain/ in this repository (ddd-test) — entities, value objects, aggregate roots, invariants. Load this when a task touches domain/ specifically (new entity, new business rule, new invariant, new Value Object, new aggregate mutation method). Normally loaded by ddd-orchestrator as step 1 of a new-domain scaffold, but can be loaded standalone for a domain-only change.
---

# `domain/` layer — entities, Value Objects, Aggregate Roots

Full context: `ARCHITECTURE.md` §2 at the repo root. This skill is the
actionable checklist; read the doc section if you need the "why".

`domain/` is pure business logic. **Zero I/O, zero imports from
`application/`, `infra/`, or `presentation/`.** The only outside import
allowed is `common/exceptions`, for throwing validation errors.

## File shape for a new concept `Foo`

```
domain/foo/
  foo.interface.ts   # IFoo (methods), IFooData (constructor shape), IFooJson (serialized shape)
  foo.ts             # class Foo implements IFoo
  index.ts           # export * from "./foo.interface"; export * from "./foo";
```

## `foo.interface.ts`

```ts
export interface IFooData {
  id: string;
  // ...other required fields, primitives or nested domain interfaces (e.g. ICompany)
}

export interface IFooJson {
  id: string;
  // ...flat, JSON-serializable shape (nested objects also as their own *Json shape)
}

export interface IFoo {
  getId(): string;
  // ...one getter per field, no setters
  toJson(): IFooJson;
}
```

## `foo.ts`

```ts
import { BadRequestException } from "../../common/exceptions";
import { IFoo, IFooData, IFooJson } from "./foo.interface";

export class Foo implements IFoo {
  private id: string;
  // ...

  constructor(data: IFooData) {
    if (!data.id) {
      throw new BadRequestException("foo id is required");
    }
    // validate every required field here — never allow an invalid object to exist
    this.id = data.id;
    // ...
  }

  getId(): string {
    return this.id;
  }

  toJson(): IFooJson {
    return { id: this.id /* ... */ };
  }
}
```

## Rules, non-negotiable

- **Validate in the constructor.** Every required field, every numeric bound
  (non-negative price, positive quantity, etc). Throw `BadRequestException`
  with a clear message. An entity must never exist in an invalid state.
- **No public setters.** State changes are named business methods. If there's
  no real business reason for external code to change a field after
  construction, don't add a way to change it.
- **Getters return defensive copies for collections.** If a field is an
  array/object that could be mutated by the caller, return a copy
  (`[...this.items]`), not the live reference — otherwise external code can
  bypass every invariant by mutating the array directly.

## Aggregate Root pattern (when `Foo` owns a collection of child entities)

Reference implementation: `domain/order/order.ts` — `Order` owns
`OrderItem[]`. Follow the same shape:

- `addChild(child)`: validate before mutating — no duplicate id, and whatever
  cross-field business invariant applies (e.g. in `Order.addItem`: the item's
  product must belong to the same catalog as the order's company, and must
  share the same currency as items already in the order). Only after all
  checks pass: `this.items.push(child)`.
- `removeChild(childId)`: look up by id, throw `NotFoundException` (from
  `common/exceptions`) if not found, then remove.
- `getChildren()`: `return [...this.items]` — defensive copy, always.
- The constructor still accepts an initial `items` array (for hydration from
  persistence via the mapper) — that's legitimate, since each child was
  already validated by its own constructor. The aggregate's own invariants
  only need to be enforced on *mutation after construction*, via `addChild`.

## Value Objects (when a value has its own validation/arithmetic rules)

Reference implementation: `domain/shared/money.ts`. Put new VOs in
`domain/shared/`. Rules:

- **Immutable**: fields `readonly`, set once in the constructor.
- **Self-validating**: constructor throws `BadRequestException` on invalid
  input (same as entities).
- **Equality by value**: implement `equals(other)`.
- **Operations return new instances**, never mutate `this`. E.g. `add()`,
  `subtract()` on `Money` each `return new Money(...)`.
- Good candidates for a new VO: anything with format rules or arithmetic of
  its own (email, SKU, a quantity with a unit). A plain string/number with no
  rules doesn't need a VO — don't over-apply this.

## Polymorphic business rules (Strategy pattern)

Reference implementation: `domain/discount/` — abstract `Discount` class with
abstract `getValue()`/`getRules()`, concrete subclasses `DiscountFixed`,
`DiscountPercentual`, `DiscountProgressive`. Use this shape whenever a rule
has multiple interchangeable implementations selected at runtime (not just an
`if/else` inside one class).

## When you're done with this layer

Run `npx tsc --noEmit --types node --skipLibCheck` — `domain/` changes should
never fail to compile due to a dependency outside `domain`+`common`; if they
do, you've imported something you shouldn't have.

Then move to the next layer skill your task needs (`ddd-infra-layer` for a
new domain scaffold), or `ddd-verify` if this was a domain-only change.
