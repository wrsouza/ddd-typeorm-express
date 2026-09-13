import { Module } from "../../core";
import { CompanyModule as CompanyInfraModule } from "../../infra/modules";
import { CompanyController } from "../controllers";
import { CompanyService } from "../services";

@Module({
  imports: [CompanyInfraModule],
  controllers: [CompanyController],
  providers: [
    {
      provide: "COMPANY_SERVICE",
      useClass: CompanyService,
    },
  ],
})
export class CompanyModule {}
