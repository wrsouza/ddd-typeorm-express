import { database } from "../../config";
import { Module } from "../../core";
import { EmployeeEntity } from "../entities";
import { EmployeeMapper } from "../mappers";
import { EmployeeRepository } from "../repositories";
import { EmployeeService } from "../services";

@Module({
  providers: [
    {
      provide: "EMPLOYEE",
      useValue: database.getRepository(EmployeeEntity),
    },
    {
      provide: "EMPLOYEE_INFRA_SERVICE",
      useClass: EmployeeService,
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
  exports: ["EMPLOYEE_INFRA_SERVICE"],
})
export class EmployeeModule {}
