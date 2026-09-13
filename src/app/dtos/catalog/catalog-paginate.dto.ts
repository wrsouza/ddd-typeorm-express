import { z } from "zod";

export const catalogSort = [
  "id",
  "-id",
  "name",
  "-name",
  "createdAt",
  "-createdAt",
];

export const catalogPaginateSchema = z
  .object({
    id: z.uuid().optional(),
    name: z.string().optional(),
    page: z.number().optional().default(1),
    limit: z.number().optional().default(10),
    sort: z.enum(catalogSort).optional().default("name"),
  })
  .required();

export type CatalogPaginateDto = z.infer<typeof catalogPaginateSchema>;
