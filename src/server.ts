import express, { Application, NextFunction, Request, Response } from "express";
import { healthRoutes, ordersRoutes } from "./routes";

const server: Application = express();
server.use(express.json());

// ── Health ───────────────────────────────────────────────────────────────────

server.use(healthRoutes);

// ── Orders ─────────────────────────────────────────────────────────────────

server.use(ordersRoutes);

// ── Error handler ────────────────────────────────────────────────────────────

server.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ error: err.message });
});

export default server;
