import { Request, Response, Router } from "express";

const router = Router();

router.get("/healthcheck", (_req: Request, res: Response) => {
  res.json({ message: "Ok" });
});

export default router;
