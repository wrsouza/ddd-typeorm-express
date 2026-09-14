import express, { Application, NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { AppModule } from "./presentation/app.module";
import { AppError } from "./common/exceptions";
import { registerRoutes } from "./core";
import { buildOpenApiDocument } from "./presentation/swagger";

const server: Application = express();
server.use(express.json());

// ── Rotas ────────────────────────────────────────────────────────────────────

const container = registerRoutes(server, AppModule);

// ── Docs (Swagger / OpenAPI) ─────────────────────────────────────────────────

const openApiDocument = buildOpenApiDocument(container);
server.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

// ── Error handler ────────────────────────────────────────────────────────────

server.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  res.status(500).json({ error: err.message });
});

export default server;
