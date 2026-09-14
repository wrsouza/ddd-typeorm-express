import { z } from "zod";

export const authLoginSchema = z
  .object({
    email: z.email(),
    password: z.string(),
  })
  .required();

export type AuthLoginDto = z.infer<typeof authLoginSchema>;
