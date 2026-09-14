import { z } from "zod";

/**
 * Generic response envelope schemas for Swagger docs.
 *
 * Result DTOs in this codebase (`*ResultDto`, `*PaginateResultDto`) are
 * plain classes built from domain `*Json` shapes, not Zod schemas — unlike
 * request DTOs. Giving every one of them a field-accurate Zod twin just for
 * docs would mean maintaining two parallel schemas per domain concept, so
 * these generic envelope shapes document the *shape* every endpoint
 * actually returns (`{ data }`, the paginate envelope, ...) without
 * re-declaring every domain field. If a consumer needs exact field-level
 * response schemas later, that's a deliberate follow-up, not implied by
 * "add docs".
 */
export const dataEnvelopeSchema = z.object({
  data: z.record(z.string(), z.any()).describe("Resource payload"),
});

export const paginateEnvelopeSchema = z.object({
  data: z.array(z.record(z.string(), z.any())),
  page: z.number(),
  tpages: z.number(),
  limit: z.number(),
  total: z.number(),
  sort: z.string(),
});

export const destroyResultSchema = z.object({
  message: z.string(),
});

export const authTokenResultSchema = z.object({
  data: z.object({ token: z.string() }),
});

export const healthResultSchema = z.object({
  message: z.string(),
});
