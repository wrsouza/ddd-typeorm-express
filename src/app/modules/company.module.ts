import { Module } from "../../core";
import { CompanyModule as CompanyInfraModule } from "../../infra/modules";
import { CompanyController } from "../controllers";
import { CompanyFilterService, CompanyService } from "../services";

@Module({
  imports: [CompanyInfraModule],
  controllers: [CompanyController],
  providers: [
    {
      provide: "COMPANY_SERVICE",
      useClass: CompanyService,
    },
    {
      provide: "COMPANY_FILTER",
      useClass: CompanyFilterService,
    },
  ],
})
export class CompanyModule {}
