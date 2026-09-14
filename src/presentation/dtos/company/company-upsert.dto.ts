import { z } from "zod";

export const companyUpsertSchema = z
  .object({
    name: z.string(),
    currency: z.string().optional(),
  })
  .required();

export type CompanyUpsertDto = z.infer<typeof companyUpsertSchema>;
