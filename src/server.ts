import express, { Application, NextFunction, Request, Response } from "express";
import { AppModule } from "./app/app.module";
import { registerRoutes } from "./core";

const server: Application = express();
server.use(express.json());

// ── Rotas ────────────────────────────────────────────────────────────────────

registerRoutes(server, AppModule);

// ── Error handler ────────────────────────────────────────────────────────────

server.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

export default server;
