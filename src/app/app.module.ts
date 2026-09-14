import { Module } from "../core";
import {
  AuthModule,
  CatalogModule,
  CompanyModule,
  EmployeeModule,
  HealthModule,
  OrderModule,
} from "./modules";

@Module({
  imports: [
    HealthModule,
    OrderModule,
    CompanyModule,
    CatalogModule,
    EmployeeModule,
    AuthModule,
  ],
})
export class AppModule {}
