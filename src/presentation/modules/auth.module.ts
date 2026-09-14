import { Module } from "../../core";
import { AuthController } from "../controllers";
import { AuthFacade } from "../facades";
import { EmployeeModule } from "./employee.module";

@Module({
  imports: [EmployeeModule],
  controllers: [AuthController],
  providers: [
    {
      provide: "AUTH_FACADE",
      useClass: AuthFacade,
    },
  ],
})
export class AuthModule {}
