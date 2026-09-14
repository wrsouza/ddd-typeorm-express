---
name: ddd-application-layer
description: How to add or change code in src/application/ in this repository (ddd-test) — application services (use cases) that orchestrate domain + infra repositories/mappers. Load this when a task touches application/ specifically (new use case, new orchestration method, wiring a new domain's repository/mapper into a service). Normally loaded by ddd-orchestrator as step 3 of a new-domain scaffold, but can be loaded standalone.
---

# `application/` layer — use cases / Application Services

Full context: `ARCHITECTURE.md` §3 at the repo root.

`application/` orchestrates: it calls `infra` repositories/mappers and
`domain` constructors to fulfill one business operation, and returns a
**domain object** — never a DTO, never anything HTTP-shaped. It has no idea
`presentation/` exists.

## File shape for a new concept `Foo`

```
application/services/foo.service.ts
application/services/interfaces/foo.interface.ts   # IFooApplicationService
application/modules/foo.module.ts
```

## `interfaces/foo.interface.ts`

```ts
import { IFoo } from "../../../domain";
import { IFooFilter } from "../../repositories"; // adjust import to wherever the filter type lives

export interface IFooApplicationService {
  paginate(filters: IFooFilter): Promise<[IFoo[], number]>;
  findById(id: string): Promise<IFoo>;
  create(data: Partial<IFooEntity>): Promise<IFoo>;
  update(id: string, data: Partial<IFooEntity>): Promise<IFoo>;
  delete(id: string): Promise<void>;
}
```

**Name it `IFooApplicationService`, never `IFooService`** — a bare `Service`
name collides in meaning with the presentation-layer Facade and this project
already had to fix that ambiguity once across the whole codebase.

## `foo.service.ts`

```ts
import { NotFoundException } from "../../common/exceptions";
import { Inject, Injectable } from "../../core";
import { IFoo } from "../../domain";
import { IFooEntity } from "../../infra/entities";
import { IFooMapper } from "../../infra/mappers";
import { IFooFilter, IFooRepository } from "../../infra/repositories";
import { IFooApplicationService } from "./interfaces";

@Injectable()
export class FooService implements IFooApplicationService {
  constructor(
    @Inject("FOO_REPOSITORY")
    private readonly fooRepository: IFooRepository,
    @Inject("FOO_MAPPER")
    private readonly fooMapper: IFooMapper,
    // any sibling application service this one needs, e.g.:
    // @Inject("COMPANY_APPLICATION_SERVICE")
    // private readonly companyService: ICompanyApplicationService,
  ) {}

  async paginate(filters: IFooFilter): Promise<[IFoo[], number]> {
    const [entities, total] = await this.fooRepository.paginate(filters);
    return [entities.map((e) => this.fooMapper.toDomain(e)), total];
  }

  async findById(id: string): Promise<IFoo> {
    const entity = await this.fooRepository.getById(id);
    if (!entity) {
      throw new NotFoundException("foo not found");
    }
    return this.fooMapper.toDomain(entity);
  }

  // create / update / delete follow the same shape: call the repository,
  // map the result through the mapper, return the domain object.
}
```

Rules:

- **Never import another domain's concrete class directly.** Always inject
  its `*ApplicationService` through its interface and DI token
  (`"COMPANY_APPLICATION_SERVICE"`), even within the same layer. This is how
  `application/services/order.service.ts` gets product/order-item data today
  — copy that shape.
- **If assembling an aggregate needs data from more than one
  repository/service** (e.g. building an `Order` needs its items' products),
  that orchestration — fetching everything, then calling the domain
  constructor or the aggregate's `addItem`-style methods — belongs *here*,
  not in a controller or facade, and not in `infra`.
- **Return domain objects, not DTOs.** If you're tempted to import something
  from `presentation/dtos` in this file, stop — that's backwards.

## `foo.module.ts`

```ts
import { Module } from "../../core";
import { FooModule as FooInfraModule } from "../../infra/modules";
import { FooService } from "../services";

@Module({
  imports: [FooInfraModule],
  providers: [
    { provide: "FOO_APPLICATION_SERVICE", useClass: FooService },
  ],
  exports: ["FOO_APPLICATION_SERVICE"],
})
export class FooModule {}
```

If `FooService` also depends on another domain's application service (e.g.
`OrderService` depends on `ORDER_ITEM_APPLICATION_SERVICE` and
`PRODUCT_APPLICATION_SERVICE`), import that domain's `application/modules`
module too, alongside the infra one — see `application/modules/order.module.ts`
for the concrete example (imports `OrderInfraModule`, `OrderItemModule`,
`ProductModule`).

## When you're done with this layer

Run `npx tsc --noEmit --types node --skipLibCheck`.

Then load `ddd-presentation-layer` next (for a new-domain scaffold), or
`ddd-verify` if this was an application-only change.
