# Arquitetura do Projeto

Este documento descreve a arquitetura em camadas (Domain-Driven Design tático + Clean
Architecture) usada neste projeto. É a referência que qualquer nova feature, módulo
ou domínio deve seguir. Se um código novo não se encaixa em nenhuma seção deste
documento, ou não sabe onde entrar, é sinal de que algo está sendo modelado errado —
pare e reconsidere antes de criar arquivo.

## 1. Visão geral das camadas

```
src/
  domain/         Entidades, Value Objects, regras de negócio puras. Zero I/O.
  application/    Casos de uso: orquestra domain + infra pra cumprir uma operação.
  infra/          Tudo que fala com o mundo externo: TypeORM, JWT, libs técnicas.
  presentation/   HTTP: controllers, DTOs, guards, facades, wiring de módulos.
  common/         Exceções e enums compartilhados por todas as camadas.
  core/           Framework interno (DI container, decorators) — não é código de negócio.
  config/         Configuração de infraestrutura (conexão de banco).
```

### Regra de dependência (a mais importante do documento)

```
presentation ──▶ application ──▶ domain
      │                              ▲
      └───────────▶ infra ───────────┘
```

- `domain` não importa de **nenhuma** outra camada de negócio (só `common`, pra exceções).
- `application` importa de `domain` e `infra` (usa repositórios/mappers de infra pra
  montar objetos de domínio).
- `infra` importa de `domain` (pra devolver objetos de domínio) e de libs externas
  (TypeORM, bcrypt, jsonwebtoken). Nunca importa de `application` nem `presentation`.
- `presentation` importa de `application` (nunca direto de `infra`, exceto pontualmente
  pra serviços puramente técnicos como o `JwtService`, que não tem regra de negócio).

Se você está prestes a importar algo de uma camada "de fora pra dentro" (ex.: `domain`
importando de `infra`), pare — isso quebra a regra e é sinal de modelagem errada.

## 2. `domain/` — regras de negócio puras

Cada conceito de negócio (Order, Product, Company, Employee, Catalog, Discount) tem
sua própria pasta com 3 arquivos:

```
domain/<nome>/
  <nome>.interface.ts   # IX, IXData (shape pro construtor), IXJson (shape de serialização)
  <nome>.ts             # implementação da classe, sempre "implements IX"
  index.ts               # barrel: export * from cada arquivo acima
```

### Padrões usados aqui

- **Entity**: classe com identidade (`id`), estado privado, só exposto via getters.
  Nunca setters soltos — mudança de estado é sempre um método de negócio nomeado
  (ex.: `order.addItem(item)`, não `order.setItems(...)`).
- **Invariantes no construtor**: toda entidade valida seus dados no `constructor` e
  lança `BadRequestException` (de `common/exceptions`) se algo obrigatório faltar ou
  for inválido. Nunca construa um objeto de domínio em estado inconsistente.
- **Aggregate Root**: `Order` é o aggregate root de `OrderItem`. Ele:
  - expõe `addItem()`/`removeItem()` — únicos pontos de mutação da lista de itens,
    cada um validando invariante de negócio (ex.: item tem que ser do mesmo catálogo
    da company do pedido, mesma moeda dos outros itens, sem id duplicado).
  - `getItems()` devolve **cópia defensiva** (`[...this.items]`) — nunca a referência
    interna, senão quem chama pode mutar o array e furar a validação.
- **Value Object** (`domain/shared/money.ts`): `Money` é imutável (campos `readonly`),
  auto-validado no construtor, com igualdade por valor (`equals`) e operações que
  devolvem uma **nova** instância (`add`, `subtract`, `multiply`, `percentage`) —
  nunca muta a si mesmo. Guarda o valor em centavos internamente pra não acumular
  erro de ponto flutuante. Qualquer novo conceito "quantidade com regra própria"
  (dinheiro, mas também candidatos futuros como CPF, e-mail, SKU) deveria virar VO
  do mesmo jeito: pasta `domain/shared/`, imutável, auto-validado.
- **Polimorfismo de domínio** (`domain/discount/`): `Discount` é uma classe abstrata
  com `getValue()`/`getRules()` abstratos; `DiscountFixed`, `DiscountPercentual`,
  `DiscountProgressive` implementam cada estratégia. Isso é o padrão Strategy
  aplicado a uma regra de negócio variável.
- **`toJson()`**: toda entidade sabe se serializar pro shape `IXJson` — é o único
  lugar em domain que "pensa" em formato de saída, e mesmo assim é neutro (não é
  DTO de API, é só a representação plana da entidade).

`domain/` **nunca** importa de `application/`, `infra/` ou `presentation/`.
Único import permitido fora de `domain/` é `common/exceptions`.

## 3. `application/` — casos de uso

```
application/
  services/
    <nome>.service.ts          # orquestra repository + mapper + domain
    interfaces/<nome>.interface.ts  # IXApplicationService
    index.ts
  modules/
    <nome>.module.ts           # DI wiring: importa infra module, registra o service
    index.ts
```

### Padrões usados aqui

- **Application Service** (termo de Eric Evans, DDD clássico): a classe que sabe
  *orquestrar* — busca dados via repository (infra), busca entidades relacionadas
  via outro application service, monta o objeto de domínio via mapper (infra), e
  devolve **objeto de domínio** (nunca DTO — DTO é problema de `presentation`).
- Interface sempre sufixada `IXApplicationService`, token de DI sempre
  `"X_APPLICATION_SERVICE"`. Nunca reuse o nome "Service" cru — outras camadas têm
  suas próprias "Service"-like (facade, infra técnico) e o nome tem que deixar
  claro de qual camada é, só de olhar o import.
- Cada `application/services/<nome>.service.ts` é `@Injectable()` e injeta:
  - repository(s) de `infra/repositories` via token `"X_REPOSITORY"`
  - mapper de `infra/mappers` via token `"X_MAPPER"`
  - outros application services via token `"Y_APPLICATION_SERVICE"` (nunca importa
    a classe de outro domínio direto, sempre pela interface + token)
- **Módulo de application** (`application/modules/<nome>.module.ts`): importa o
  módulo de infra homônimo (pra herdar repository+mapper), registra o Application
  Service sob o token `"X_APPLICATION_SERVICE"`, exporta esse token.

`application/` não conhece HTTP, DTO, nem Express. Se um arquivo aqui importa algo
de `presentation/`, está errado.

## 4. `infra/` — adapters técnicos

```
infra/
  entities/            # entidades TypeORM (@Entity), refletem tabela do banco
    interfaces/
  repositories/
    repository.ts       # classe base abstrata (paginate/getById/save/delete genéricos)
    <nome>.repository.ts
    interfaces/
  mappers/
    <nome>.mapper.ts     # traduz Entity (TypeORM) → objeto de domínio
    interfaces/
  modules/
    <nome>.module.ts     # registra conexão TypeORM + repository + mapper
  services/
    jwt.service.ts        # capacidade técnica pura (wrapper de lib externa)
  seeds/                 # dados de desenvolvimento/teste
```

### Padrões usados aqui

- **Repository**: `infra/repositories/repository.ts` é uma classe base abstrata
  genérica (`Repository<T>`) com `paginate`, `getById`, `getByIds`, `save`, `create`,
  `update`, `delete` já implementados por cima de `typeorm.Repository<T>`. Cada
  repository concreto (`OrderRepository`, `ProductRepository`...) estende essa base
  e só sobrescreve `getPaginateWhere()` com os filtros específicos daquele domínio.
- **Mapper**: responsável exclusivamente por converter `IXEntity` (formato de banco,
  com FKs cruas tipo `companyId: string`) em objeto de `domain` (com objetos
  aninhados de verdade, tipo `company: ICompany`). Nunca contém regra de negócio,
  só tradução de shape.
- **Módulo de infra** (`infra/modules/<nome>.module.ts`): só registra 3 coisas —
  conexão TypeORM (`useValue: database.getRepository(XEntity)`), o `XRepository`
  (`useFactory`, injeta a conexão), e o `XMapper`. **Não registra nenhum Service.**
  Exporta os tokens `"X_REPOSITORY"` e `"X_MAPPER"`.
- **Serviço técnico puro** (`infra/services/jwt.service.ts`): fica em infra quando
  é só wrapper de uma lib externa sem regra de negócio nenhuma (assinar/verificar
  JWT). Não precisa de token de DI explícito — o container resolve pela própria
  classe (`@Inject(JwtService)`).

`infra/` nunca importa de `application/` nem `presentation/`.

## 5. `presentation/` — entrega HTTP

```
presentation/
  controllers/
    <nome>.controller.ts   # @Controller, métodos @Get/@Post/... chamam a facade
  dtos/<nome>/
    <nome>-result.dto.ts    # shape de resposta
    <nome>-paginate.dto.ts  # shape de query params de listagem
    <nome>-upsert.dto.ts    # shape de body de criação/edição
    index.ts
  facades/<nome>/
    <nome>.facade.ts         # IXFacade — ponte controller → application service
    <nome>.interface.ts
    <nome>-filter.service.ts # traduz DTO de paginação em filtro de repository
    index.ts
  guards/
    auth.guard.ts            # @UseGuards — protege rota, resolve identidade do request
  decorators/
    swagger.decorator.ts      # @ApiTags/@ApiOperation/@ApiBody/@ApiQuery/@ApiResponse/@ApiBearerAuth
  swagger/
    build-document.ts         # varre os controllers do container e gera o OpenAPI document
  modules/
    <nome>.module.ts          # registra controller + facade + filter no DI
  app.module.ts                # módulo raiz: importa todos os módulos de domínio
```

### Padrões usados aqui

- **Facade**: a classe que faz a ponte entre "o que o HTTP perguntou" e "o caso de
  uso que resolve isso". Duas responsabilidades específicas dela, que nunca vazam
  pra `application`:
  1. Resolver identidade de request → conceito de domínio (ex.: `employeeId` do JWT
     → `company` via `companyService.findByEmployeeId()`).
  2. Moldar o objeto de domínio devolvido pelo application service no DTO de
     resposta da API (`new OrderResultDto(order.toJson())`).
  Interface sempre `IXFacade`, token de DI sempre `"X_FACADE"`, arquivo sempre
  `<nome>.facade.ts`.
- **Controller**: fininho de propósito — só declara rota (`@Get`, `@Post`...),
  extrai parâmetros (`@Param`, `@Query`, `@Body`, `@Req`) e repassa pra facade.
  Nunca tem lógica, nem acesso a repository/domain direto.
- **DTO**: toda classe imutável (`readonly`), construída a partir de um shape de
  domínio (`IXJson`) ou validada via `zod` no request. DTOs de resposta aninhados
  (ex.: `OrderItemResultDto` dentro de `OrderResultDto`) ficam na mesma pasta do
  DTO pai — **cuidado pra não duplicar nome de classe entre pastas diferentes**
  (ex.: não existir dois `CompanyResultDto` com shapes diferentes — se precisar de
  um resumo específico pra dentro de outro DTO, nomeie pelo contexto, ex.:
  `OrderCompanyDto`).
- **Guard**: implementa `CanActivate`, injeta só o que precisa pra decidir
  autorização (aqui, `JwtService` de `infra/services`). Não injeta facade nem
  application service.
- **Módulo de presentation** (`presentation/modules/<nome>.module.ts`): importa o
  módulo de `application` homônimo, registra `Controller` + `Facade` + `FilterService`.
- **Docs (Swagger/OpenAPI)**: os decorators `@ApiTags`/`@ApiOperation`/`@ApiBody`/
  `@ApiQuery`/`@ApiResponse`/`@ApiBearerAuth` (`presentation/decorators/swagger.decorator.ts`)
  gravam metadata via `reflect-metadata` em cima dos schemas `zod` que já existem
  nos DTOs — não redeclaram shape nenhum. `presentation/swagger/build-document.ts`
  varre todos os controllers registrados no container de DI (rotas + guards +
  essa metadata) e monta um `OpenAPIObject` com `@asteasolutions/zod-to-openapi`;
  `src/server.ts` serve esse documento em `/docs` com `swagger-ui-express`. É
  puramente documentação — decorar uma rota com `@Api*` não afeta o pipeline de
  request (validação/execução continua vindo do `core`).

## 6. `common/` e `core/` — transversais

- **`common/exceptions/`**: hierarquia de erro única do projeto (`AppError` base +
  `BadRequestException`, `NotFoundException`, `ConflictException`,
  `UnauthorizedException`, `ForbiddenException`, `ValidationException`,
  `InternalServerErrorException`). Toda camada pode usar (inclusive `domain`) —
  é o único "furo" permitido na regra de dependência, porque exceção não carrega
  lógica de negócio nem acoplamento de camada, só semântica de erro + status HTTP,
  interpretado no final da cadeia pelo error handler do Express
  (`src/server.ts`).
- **`core/`**: implementação própria (bem pequena) de um container de DI +
  decorators, inspirado em NestJS: `@Module`, `@Controller`, `@Injectable`,
  `@Inject(token)`, `@Get/@Post/@Put/@Patch/@Delete`, `@Param/@Query/@Body/@Headers/@Req`,
  `@UseGuards`. Não é código de negócio — é o "framework" que sustenta tudo.

## 7. Injeção de dependência — como funciona aqui

O container (`core/container.ts`) é **flat e global**: quando um módulo é
carregado (`loadModule`), todos os seus `providers` e `controllers` entram num
único registry por token — não existe escopo por módulo de verdade. O campo
`exports` de um `@Module` é só documentação de intenção (ajuda humano a saber o
que aquele módulo "oferece" pra quem importa ele), não afeta visibilidade em
runtime.

Cada dependência de construtor precisa de `@Inject(token)` explícito — o token é
sempre uma string (`"ORDER_REPOSITORY"`) ou a própria classe (`@Inject(JwtService)`,
quando não há interface pública, só a classe concreta). **Nunca confie em inferência
de tipo** — o runtime de dev (`tsx`) não emite `design:paramtypes`, então um
parâmetro sem `@Inject` explícito quebra em runtime com erro claro.

### Convenção de nomes de token por camada

| Camada       | Sufixo do token         | Exemplo                  |
|--------------|--------------------------|---------------------------|
| infra        | `_REPOSITORY`, `_MAPPER` | `ORDER_REPOSITORY`        |
| application  | `_APPLICATION_SERVICE`   | `ORDER_APPLICATION_SERVICE` |
| presentation | `_FACADE`, `_FILTER`     | `ORDER_FACADE`             |

Isso não é cosmético — é o que deixa possível saber, só lendo `@Inject("...")`
num arquivo qualquer, de qual camada aquela dependência vem, sem abrir o arquivo.

## 8. Como adicionar um domínio novo (receita)

Pra um conceito novo "Foo" com CRUD + paginação, siga esta ordem — cada passo só
faz sentido depois do anterior existir:

1. **`domain/foo/`**: `foo.interface.ts` (`IFoo`, `IFooData`, `IFooJson`),
   `foo.ts` (classe `Foo implements IFoo`, valida invariantes no construtor),
   `index.ts`. Rode `tsc --noEmit` — domain nunca deveria falhar por dependência
   externa.
2. **`infra/entities/foo.entity.ts`**: `@Entity()` TypeORM, campos crus de banco.
3. **`infra/mappers/foo.mapper.ts`**: `FooMapper implements IFooMapper`, método
   `toDomain(entity) => new Foo({...})`.
4. **`infra/repositories/foo.repository.ts`**: `class FooRepository extends
   Repository<IFooEntity>`, sobrescreve `getPaginateWhere` se precisar de filtro.
5. **`infra/modules/foo.module.ts`**: registra `FOO` (conexão), `FOO_REPOSITORY`,
   `FOO_MAPPER`. Exporta os dois últimos tokens.
6. **`application/services/foo.service.ts`** + `interfaces/foo.interface.ts`
   (`IFooApplicationService`): injeta `FOO_REPOSITORY` + `FOO_MAPPER`, implementa
   `paginate`/`findById`/`create`/`update`/`delete` devolvendo `IFoo` (domínio).
7. **`application/modules/foo.module.ts`**: importa `FooModule` de infra, registra
   `FOO_APPLICATION_SERVICE`.
8. **`presentation/dtos/foo/`**: `foo-result.dto.ts`, `foo-paginate.dto.ts`,
   `foo-paginate-result.dto.ts`, `foo-upsert.dto.ts`, `index.ts`.
9. **`presentation/facades/foo/`**: `foo.interface.ts` (`IFooFacade`),
   `foo.facade.ts` (injeta `FOO_APPLICATION_SERVICE`, traduz pra DTO),
   `foo-filter.interface.ts` + `foo-filter.service.ts` (estende
   `FilterService` de `facades/shared`), `index.ts`.
10. **`presentation/controllers/foo.controller.ts`**: `@Controller("foos")`,
    injeta `FOO_FACADE`, métodos HTTP repassam pra facade.
11. **`presentation/modules/foo.module.ts`**: importa módulo de application,
    registra controller + `FOO_FACADE` + `FOO_FILTER`.
12. Registra o módulo de presentation em `presentation/app.module.ts`.
13. **Testa de ponta a ponta**: `tsc --noEmit`, sobe o servidor
    (`npx tsx src/index.ts`), bate nos endpoints novos com `curl` antes de dar
    como pronto. Nunca reporte uma feature como concluída sem isso.

## 9. Erros conhecidos / dívida técnica consciente

Registrado aqui de propósito, pra não ser redescoberto do zero depois:

- `infra/repositories/interfaces/*.ts` ainda expõe tipos do TypeORM
  (`FindOptionsWhere`, `ILike`) na assinatura pública — não é 100% agnóstico de
  tecnologia. Aceitável pro tamanho do projeto, mas é o próximo passo se algum dia
  trocar de ORM.
- `Discount.getValue()` ainda trabalha com `number` puro, não `Money` — porque
  `Discount` não carrega moeda (só `sku`). Dar moeda a ele é decisão de design em
  aberto, não bug.
- Só existe um Value Object (`Money`). Candidatos naturais a virar VO no futuro:
  e-mail, SKU, quantidade em caixas.
- Sem Domain Events, sem Bounded Contexts — o projeto é um único modelo de domínio.
  Não é lacuna pro tamanho atual; vira relevante só se o domínio crescer muito ou
  precisar de múltiplos times/serviços.
- `OrderService.addItem()` injeta `ORDER_ITEM_REPOSITORY` direto e chama
  `orderItemRepository.save()` ele mesmo, em vez de delegar pro
  `IOrderItemService` (`ORDER_ITEM_APPLICATION_SERVICE`) que a mesma classe já
  injeta pra outra coisa. Inconsistente com o padrão do resto do projeto (regra
  8.6/8.7 — application service só fala com repository do próprio domínio,
  domínios vizinhos via outro application service). Funciona, mas o próximo
  ajuste em persistência de item de pedido deveria mover isso pra dentro de
  `OrderItemService`.
