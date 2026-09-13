import { Module } from "../../core";
import { EmployeeModule as EmployeeInfraModule } from "../../infra/modules";
import { EmployeeController } from "../controllers";
import { EmployeeFilterService, EmployeeService } from "../services";

@Module({
  imports: [EmployeeInfraModule],
  controllers: [EmployeeController],
  providers: [
    {
      provide: "EMPLOYEE_SERVICE",
      useClass: EmployeeService,
    },
    {
      provide: "EMPLOYEE_FILTER",
      useClass: EmployeeFilterService,
    },
  ],
})
export class EmployeeModule {}
