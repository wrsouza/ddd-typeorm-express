import { Module } from "../../core";
import { EmployeeModule as EmployeeInfraModule } from "../../infra/modules";
import { EmployeeService } from "../services";

@Module({
  imports: [EmployeeInfraModule],
  providers: [
    {
      provide: "EMPLOYEE_APPLICATION_SERVICE",
      useClass: EmployeeService,
    },
  ],
  exports: ["EMPLOYEE_APPLICATION_SERVICE"],
})
export class EmployeeModule {}
