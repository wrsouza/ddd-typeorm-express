import { z } from "zod";

export const employeeUpdateSchema = z
  .object({
    companyId: z.uuid().optional(),
    name: z.string().optional(),
    email: z.email().optional(),
    password: z.string().optional(),
    passwordConfirm: z.string().optional(),
  })
  .required();

export type EmployeeUpdateDto = z.infer<typeof employeeUpdateSchema>;
