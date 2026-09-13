import { z } from "zod";

export const catalogUpsertSchema = z
  .object({
    name: z.string(),
    currency: z.string(),
  })
  .required();

export type CatalogUpsertDto = z.infer<typeof catalogUpsertSchema>;
