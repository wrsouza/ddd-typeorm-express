---
name: ddd-infra-layer
description: How to add or change code in src/infra/ in this repository (ddd-test) — TypeORM entities, repositories, mappers, and infra DI modules. Load this when a task touches infra/ specifically (new entity/table, new repository filter, new mapper, a purely technical adapter like a new external-library wrapper). Normally loaded by ddd-orchestrator as step 2 of a new-domain scaffold, but can be loaded standalone.
---

# `infra/` layer — TypeORM, repositories, mappers, technical adapters

Full context: `ARCHITECTURE.md` §4 at the repo root.

`infra/` talks to the outside world (database, external libraries). It never
imports from `application/` or `presentation/`. It imports from `domain/`
only to return domain objects out of mappers.

## File shape for a new concept `Foo`

```
infra/entities/foo.entity.ts              # TypeORM @Entity, raw DB shape
infra/entities/interfaces/foo.interface.ts # IFooEntity (if the pattern used elsewhere needs it)
infra/mappers/foo.mapper.ts               # FooMapper implements IFooMapper
infra/mappers/interfaces/foo.interface.ts  # IFooMapper
infra/repositories/foo.repository.ts       # FooRepository extends Repository<IFooEntity>
infra/repositories/interfaces/foo.interface.ts # IFooRepository, IFooFilter
infra/modules/foo.module.ts                # DI wiring: connection + repository + mapper
```

Check `infra/entities/`, `infra/mappers/`, `infra/repositories/` for an
existing sibling (e.g. `product.entity.ts` / `product.mapper.ts` /
`product.repository.ts`) and mirror its exact shape before inventing your own.

## `foo.entity.ts`

TypeORM entity, raw persistence shape — foreign keys as plain string ids
(`companyId: string`), not nested objects. No domain logic, no methods beyond
what TypeORM needs.

## `foo.mapper.ts`

```ts
import { Injectable } from "../../core";
import { Foo, IFoo } from "../../domain/foo";
import { IFooEntity } from "../entities";
import { IFooMapper } from "./interfaces/foo.interface";

@Injectable()
export class FooMapper implements IFooMapper {
  toDomain(entity: IFooEntity /*, ...other domain deps needed to build Foo */): IFoo {
    return new Foo({
      id: entity.id,
      // translate every field; this is pure translation, never business logic
    });
  }
}
```

If `Foo` needs related domain objects to be constructed (like `Order` needs
`ICompany` and `IOrderItem[]`), those are passed in as extra mapper
parameters by whoever calls it (the application service) — the mapper itself
doesn't fetch them.

## `foo.repository.ts`

```ts
import { Injectable } from "../../core";
import { IFooEntity } from "../entities";
import { IFooRepository, IFooFilter } from "./interfaces";
import { Repository } from "./repository";
import type { FindOptionsWhere } from "typeorm";

@Injectable()
export class FooRepository
  extends Repository<IFooEntity>
  implements IFooRepository
{
  protected override getPaginateWhere(
    params: IFooFilter,
  ): FindOptionsWhere<IFooEntity> {
    return {
      // only the fields that need custom filtering; the base class already
      // handles page/limit/order
    };
  }
}
```

The base `Repository<T>` (`infra/repositories/repository.ts`) already
implements `paginate`, `getById`, `getByIds`, `save`, `create`, `update`,
`delete`. **Never reimplement these** — only override `getPaginateWhere()`.

## `foo.module.ts`

```ts
import { database } from "../../config";
import { Module } from "../../core";
import { FooEntity } from "../entities";
import { FooMapper } from "../mappers";
import { FooRepository } from "../repositories";

@Module({
  providers: [
    { provide: "FOO", useValue: database.getRepository(FooEntity) },
    {
      provide: "FOO_REPOSITORY",
      useFactory: (client) => new FooRepository(client),
      inject: ["FOO"],
    },
    { provide: "FOO_MAPPER", useClass: FooMapper },
  ],
  exports: ["FOO_REPOSITORY", "FOO_MAPPER"],
})
export class FooModule {}
```

**Never register a business Service here.** This module's only job is:
database connection, repository, mapper. The class that orchestrates them
(`FooService`) belongs in `application/modules/foo.module.ts` — see
`ddd-application-layer`. If you find yourself importing another domain's
module here just so a Service can use it, that Service doesn't belong in this
file.

## Purely technical adapters (no business meaning)

Reference: `infra/services/jwt.service.ts`. If something is just a wrapper
around an external library with zero business logic (issuing/verifying a JWT,
hashing, an email-sending client), it goes in `infra/services/<name>.service.ts`
— plain `Service` name is fine here precisely *because* it has no business
orchestration to be confused with an Application Service. It doesn't need an
explicit DI token if only one implementation will ever exist — the container
can resolve it by class reference (`@Inject(JwtService)`).

## When you're done with this layer

Run `npx tsc --noEmit --types node --skipLibCheck`.

Then load `ddd-application-layer` next (for a new-domain scaffold), or
`ddd-verify` if this was an infra-only change.
