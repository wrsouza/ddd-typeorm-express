import { Module } from "../../core";
import { EmployeeModule as EmployeeApplicationModule } from "../../application/modules";
import { EmployeeController } from "../controllers";
import { EmployeeFilterService, EmployeeFacade } from "../facades";

@Module({
  imports: [EmployeeApplicationModule],
  controllers: [EmployeeController],
  providers: [
    {
      provide: "EMPLOYEE_FACADE",
      useClass: EmployeeFacade,
    },
    {
      provide: "EMPLOYEE_FILTER",
      useClass: EmployeeFilterService,
    },
  ],
})
export class EmployeeModule {}
