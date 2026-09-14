import { z } from "zod";

export const companySort = [
  "id",
  "-id",
  "name",
  "-name",
  "createdAt",
  "-createdAt",
];

export const companyPaginateSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().optional(),
  catalogId: z.string().nullable().optional(),
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  sort: z.enum(companySort).optional().default("name"),
});

export type CompanyPaginateDto = z.infer<typeof companyPaginateSchema>;
