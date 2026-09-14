---
name: ddd-presentation-layer
description: How to add or change code in src/presentation/ in this repository (ddd-test) — controllers, DTOs, facades, guards, and presentation DI modules. Load this when a task touches presentation/ specifically (new endpoint/route, new DTO shape, new facade method, request-scoped auth logic). Normally loaded by ddd-orchestrator as step 4 of a new-domain scaffold, but can be loaded standalone.
---

# `presentation/` layer — controllers, DTOs, facades

Full context: `ARCHITECTURE.md` §5 at the repo root.

`presentation/` is the HTTP delivery mechanism. It translates request-scoped
concerns (auth identity, query params, request body) into calls on
`application/`, and translates the domain object that comes back into an API
response shape. It never talks to `infra` repositories/mappers directly
(the one narrow exception: a purely technical `infra/services/*` like
`JwtService`, injected straight into a guard or facade).

## File shape for a new concept `Foo`

```
presentation/dtos/foo/
  foo-result.dto.ts
  foo-paginate.dto.ts
  foo-paginate-result.dto.ts
  foo-upsert.dto.ts        # or foo-create.dto.ts + foo-update.dto.ts if they diverge
  index.ts
presentation/facades/foo/
  foo.interface.ts          # IFooFacade
  foo.facade.ts             # FooFacade implements IFooFacade
  foo-filter.interface.ts
  foo-filter.service.ts     # extends FilterService from facades/shared
  index.ts
presentation/controllers/foo.controller.ts
presentation/modules/foo.module.ts
```

## DTOs

Plain classes, `readonly` fields, constructed from the domain's `*Json`
shape:

```ts
export class FooResultDto {
  readonly id: string;
  // ...
  constructor(data: IFooJson) {
    this.id = data.id;
    // ...
  }
}
```

**Before naming a new DTO class, grep the other `dtos/*/` folders for the
same class name.** This project once had two different `CompanyResultDto`
classes with different shapes (one a full API envelope, one a nested summary)
— purely accidental, confusing to anyone reading it. If you need a
context-specific nested shape, name it for the context (`OrderCompanyDto`,
not a second `CompanyResultDto`).

## `foo.interface.ts` + `foo.facade.ts`

```ts
export interface IFooFacade {
  paginate(params: FooPaginateDto): Promise<FooPaginateResultDto>;
  findById(id: string): Promise<FooResultDto>;
  // ...
}
```

```ts
import { Inject, Injectable } from "../../../core";
import { IFooApplicationService } from "../../../application/services";
import { FooPaginateDto, FooPaginateResultDto, FooResultDto } from "../../dtos";
import { IFooFilterService } from "./foo-filter.interface";
import { IFooFacade } from "./foo.interface";

@Injectable()
export class FooFacade implements IFooFacade {
  constructor(
    @Inject("FOO_APPLICATION_SERVICE")
    private readonly service: IFooApplicationService,
    @Inject("FOO_FILTER")
    private readonly filterService: IFooFilterService,
  ) {}

  async paginate(params: FooPaginateDto): Promise<FooPaginateResultDto> {
    const filters = this.filterService.getFilter(params);
    const [items, total] = await this.service.paginate(filters);
    return new FooPaginateResultDto(items.map((i) => i.toJson()), filters, total);
  }

  async findById(id: string): Promise<FooResultDto> {
    const foo = await this.service.findById(id);
    return new FooResultDto(foo.toJson());
  }
}
```

**Name it `FooFacade` / `IFooFacade`, file `foo.facade.ts`, token
`"FOO_FACADE"` — never `FooService`.** If the facade needs to resolve a
request-scoped identity into a domain concept first (the way
`OrderFacade.paginate` resolves `employeeId` → `company` via
`companyService.findByEmployeeId()` before calling the order application
service), that translation belongs here, not in the application layer — a
non-HTTP caller of the same use case wouldn't have an `employeeId` at all.

`foo-filter.service.ts` extends `FilterService` from
`presentation/facades/shared` and only needs to override
`getFilter()`/add id-specific filter fields — the base class already handles
page/limit/sort defaults.

## `foo.controller.ts`

```ts
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from "../../core";
import { FooPaginateDto, FooPaginateResultDto, FooResultDto, FooUpsertDto } from "../dtos";
import { IFooFacade } from "../facades";

@Controller("foos")
export class FooController {
  constructor(
    @Inject("FOO_FACADE")
    private readonly facade: IFooFacade,
  ) {}

  @Get()
  async paginate(@Query() params: FooPaginateDto): Promise<FooPaginateResultDto> {
    return this.facade.paginate(params);
  }

  @Get(":id")
  async show(@Param("id") id: string): Promise<FooResultDto> {
    return this.facade.findById(id);
  }
}
```

Controllers have **no logic** — just route declaration, param extraction, and
a call to the facade. If you're writing an `if` in a controller, that
belongs in the facade or deeper.

Add `@UseGuards(AuthGuard)` at class or method level for any route that
needs an authenticated employee (see `presentation/controllers/order.controller.ts`
for the pattern; `@Req("employeeId")` reads what the guard attached to the
request).

## `foo.module.ts`

```ts
import { Module } from "../../core";
import { FooModule as FooApplicationModule } from "../../application/modules";
import { FooController } from "../controllers";
import { FooFilterService, FooFacade } from "../facades";

@Module({
  imports: [FooApplicationModule],
  controllers: [FooController],
  providers: [
    { provide: "FOO_FACADE", useClass: FooFacade },
    { provide: "FOO_FILTER", useClass: FooFilterService },
  ],
})
export class FooModule {}
```

Finally, add `FooModule` to the `imports` array in
`presentation/app.module.ts` — a module that's never imported there is dead
code (this project had exactly one empty, unimported module lying around
before it got cleaned up; don't recreate that).

## When you're done with this layer

Run `npx tsc --noEmit --types node --skipLibCheck`.

Then load `ddd-verify` — always the last step, no exceptions.
