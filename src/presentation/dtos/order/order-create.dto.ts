import { z } from "zod";

export const orderProductSchema = z
  .object({
    productId: z.string(),
    quantity: z.number(),
  })
  .required();

export const orderCreateSchema = z
  .object({
    companyId: z.string(),
    name: z.string(),
    products: z.array(orderProductSchema),
  })
  .required();

export type OrderCreateDto = z.infer<typeof orderCreateSchema>;
