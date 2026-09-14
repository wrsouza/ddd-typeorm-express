# ddd-test

API de catálogo/pedidos (companies, employees, catalogs, products, orders com
desconto) construída como exemplo prático de **Domain-Driven Design tático +
Clean Architecture** em TypeScript, com um mini-framework de DI próprio
(estilo NestJS, sem dependência do Nest) por cima de Express + TypeORM.

Ler a arquitetura em detalhe: **[ARCHITECTURE.md](ARCHITECTURE.md)**.
Se você é um assistente de IA trabalhando neste repositório, leia primeiro
**[CLAUDE.md](CLAUDE.md)**.

## Stack

- TypeScript + [tsx](https://github.com/privatenumber/tsx) (dev runtime, sem build step)
- Express (HTTP)
- TypeORM + `better-sqlite3` (persistência — banco de arquivo local `database.db`)
- `jsonwebtoken` + `bcrypt` (autenticação)
- `zod` (validação de alguns DTOs de entrada)
- `@faker-js/faker` (seeds de desenvolvimento)

## Rodando localmente

```bash
npm install
```

Crie um `.env` na raiz com:

```
JWT_SECRET=qualquer-segredo-de-desenvolvimento
JWT_EXPIRES_IN=1d
PORT=3000
```

```bash
npm run dev
```

Isso sobe o servidor com `tsx watch`, inicializa o banco SQLite
(`./database.db`, criado automaticamente via `synchronize: true` do TypeORM)
e roda os seeds de desenvolvimento (dados fake via `faker`) a cada boot.

Não existe script de `build`/`test` ainda — o projeto roda direto via `tsx`
em desenvolvimento.

## Estrutura do código

```
src/
  domain/         entidades + Value Objects, regra de negócio pura, zero I/O
  application/    casos de uso — orquestra domain + infra
  infra/          TypeORM, repositórios, mappers, adapters técnicos (JWT)
  presentation/   HTTP — controllers, DTOs, guards, facades
  common/         exceções compartilhadas
  core/           mini-framework de DI (decorators + container)
  config/         conexão de banco
```

Detalhe completo de cada camada, padrões usados (Entity, Value Object,
Aggregate Root, Repository, Application Service, Facade) e convenção de nomes
de token de DI: **[ARCHITECTURE.md](ARCHITECTURE.md)**.

## Endpoints

Prefixo vazio (`http://localhost:3000`). Rotas marcadas 🔒 exigem
`Authorization: Bearer <token>` (obtido em `POST /auth/login`).

| Método | Rota              | Descrição                          |
|--------|--------------------|--------------------------------------|
| GET    | `/health`          | health check                         |
| POST   | `/auth/login`       | login (email + senha) → token JWT    |
| POST   | `/auth/refresh`     | renova o token                       |
| POST   | `/auth/validate` 🔒 | valida token, devolve o employee      |
| GET    | `/companies`        | lista (paginado)                     |
| GET    | `/companies/:id`    | detalhe                              |
| POST   | `/companies`        | cria                                 |
| PUT    | `/companies/:id`    | atualiza                             |
| DELETE | `/companies/:id`    | remove                               |
| GET    | `/employees`        | lista (paginado)                     |
| GET    | `/employees/:id`    | detalhe                              |
| POST   | `/employees`        | cria                                 |
| PUT    | `/employees/:id`    | atualiza                             |
| DELETE | `/employees/:id`    | remove                               |
| GET    | `/catalogs`         | lista (paginado)                     |
| GET    | `/catalogs/:id`     | detalhe                              |
| POST   | `/catalogs`         | cria                                 |
| PUT    | `/catalogs/:id`     | atualiza                             |
| DELETE | `/catalogs/:id`     | remove                               |
| GET    | `/orders` 🔒        | lista pedidos da company do employee logado |
| GET    | `/orders/:id` 🔒    | detalhe do pedido                     |

Senha de todos os employees gerados no seed: `123456`.

```bash
EMAIL=$(sqlite3 database.db 'SELECT email FROM employees LIMIT 1;')
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"123456\"}"
```

## Contribuindo / adicionando features

Este projeto tem uma arquitetura deliberadamente rígida — todo domínio novo
segue o mesmo formato de 4 camadas. Não é pra ser reinventado a cada feature.
Veja [CLAUDE.md](CLAUDE.md) se estiver usando um assistente de IA, ou
[ARCHITECTURE.md](ARCHITECTURE.md) §8 pra receita manual passo a passo.
