import { Module } from "../core";
import {
  CatalogModule,
  CompanyModule,
  HealthModule,
  OrderModule,
} from "./modules";

@Module({
  imports: [OrderModule, CompanyModule, CatalogModule, HealthModule],
})
export class AppModule {}
