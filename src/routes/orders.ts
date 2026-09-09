import { Request, Response, Router } from "express";
import { ordersService } from "./instances";

const router = Router();

router.get("/orders", async (_req: Request, _res: Response) => {
  const companyId = String(_req.query.companyId);
  if (!companyId) {
    throw new Error("companyId is required");
  }
  const result = await ordersService.getAll(companyId);
  return _res.status(200).json({ data: result });
});

export default router;
