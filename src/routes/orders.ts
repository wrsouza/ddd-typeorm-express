import { Request, Response, Router } from "express";
import { ordersUseCase } from "./instances";

const router = Router();

router.get("/orders", async (_req: Request, _res: Response) => {
  const companyId = _req.query.companyId as string;
  if (!companyId) {
    throw new Error("companyId is required");
  }
  const result = await ordersUseCase.getAll(companyId);
  return _res.status(200).json({ data: result });
});

router.post("/orders", async (_req: Request, _res: Response) => {
  const companyId = _req.body.companyId as string;
  if (!companyId) {
    throw new Error("companyId is required");
  }
  const result = await ordersUseCase.create(companyId);
  return _res.status(201).json({ data: result });
});

export default router;
