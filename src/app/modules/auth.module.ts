import { Module } from "../../core";
import { AuthController } from "../controllers";
import { AuthService } from "../services";
import { EmployeeModule } from "./employee.module";

@Module({
  imports: [EmployeeModule],
  controllers: [AuthController],
  providers: [
    {
      provide: "AUTH_SERVICE",
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
