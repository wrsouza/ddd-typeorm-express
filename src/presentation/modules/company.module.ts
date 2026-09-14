import { Module } from "../../core";
import { CompanyModule as CompanyApplicationModule } from "../../application/modules";
import { CompanyController } from "../controllers";
import { CompanyFilterService, CompanyFacade } from "../facades";

@Module({
  imports: [CompanyApplicationModule],
  controllers: [CompanyController],
  providers: [
    {
      provide: "COMPANY_FACADE",
      useClass: CompanyFacade,
    },
    {
      provide: "COMPANY_FILTER",
      useClass: CompanyFilterService,
    },
  ],
})
export class CompanyModule {}
