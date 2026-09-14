import { Module } from "../../core";
import { CompanyModule as CompanyInfraModule } from "../../infra/modules";
import { CompanyService } from "../services";

@Module({
  imports: [CompanyInfraModule],
  providers: [
    {
      provide: "COMPANY_APPLICATION_SERVICE",
      useClass: CompanyService,
    },
  ],
  exports: ["COMPANY_APPLICATION_SERVICE"],
})
export class CompanyModule {}
