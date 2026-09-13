import { Module } from "../core";
import {
  CatalogModule,
  CompanyModule,
  EmployeeModule,
  HealthModule,
  OrderModule,
} from "./modules";

@Module({
  imports: [
    OrderModule,
    CompanyModule,
    CatalogModule,
    HealthModule,
    EmployeeModule,
  ],
})
export class AppModule {}
