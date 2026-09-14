import { z } from "zod";

export const employeeCreateSchema = z
  .object({
    companyId: z.uuid(),
    name: z.string(),
    email: z.email(),
    password: z.string(),
    passwordConfirm: z.string(),
  })
  .required();

export type EmployeeCreateDto = z.infer<typeof employeeCreateSchema>;
