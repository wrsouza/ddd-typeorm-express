import { database } from "../../config";
import { Module } from "../../core";
import { EmployeeEntity } from "../entities";
import { EmployeeMapper } from "../mappers";
import { EmployeeRepository } from "../repositories";

@Module({
  providers: [
    {
      provide: "EMPLOYEE",
      useValue: database.getRepository(EmployeeEntity),
    },
    {
      provide: "EMPLOYEE_REPOSITORY",
      useFactory: (client) => new EmployeeRepository(client),
      inject: ["EMPLOYEE"],
    },
    {
      provide: "EMPLOYEE_MAPPER",
      useClass: EmployeeMapper,
    },
  ],
  exports: ["EMPLOYEE_REPOSITORY", "EMPLOYEE_MAPPER"],
})
export class EmployeeModule {}
