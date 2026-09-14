import { z } from "zod";

export const orderSort = [
  "id",
  "-id",
  "name",
  "-name",
  "createdAt",
  "-createdAt",
];

export const orderPaginateSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().optional(),
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  sort: z.enum(orderSort).optional().default("name"),
});

export type OrderPaginateDto = z.infer<typeof orderPaginateSchema>;
