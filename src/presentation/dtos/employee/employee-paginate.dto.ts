import { z } from "zod";

export const employeeSort = [
  "id",
  "-id",
  "name",
  "-name",
  "createdAt",
  "-createdAt",
];

export const employeePaginateSchema = z.object({
  id: z.uuid().optional(),
  companyId: z.string().optional(),
  name: z.string().optional(),
  email: z.email().optional(),
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  sort: z.enum(employeeSort).optional().default("name"),
});

export type EmployeePaginateDto = z.infer<typeof employeePaginateSchema>;
