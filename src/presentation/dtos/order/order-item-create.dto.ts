import { z } from "zod";

export const orderItemCreateSchema = z
  .object({
    productId: z.string(),
    quantity: z.number(),
  })
  .required();

export type OrderItemCreateDto = z.infer<typeof orderItemCreateSchema>;
