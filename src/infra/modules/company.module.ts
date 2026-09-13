import { database } from "../../config";
import { Module } from "../../core";
import { CompanyEntity } from "../entities";
import { CompanyMapper } from "../mappers";
import { CompanyRepository } from "../repositories";
import { CompanyService } from "../services";

@Module({
  providers: [
    {
      provide: "COMPANY",
      useValue: database.getRepository(CompanyEntity),
    },
    {
      provide: "COMPANY_INFRA_SERVICE",
      useClass: CompanyService,
    },
    {
      provide: "COMPANY_REPOSITORY",
      useFactory: (client) => new CompanyRepository(client),
      inject: ["COMPANY"],
    },
    {
      provide: "COMPANY_MAPPER",
      useClass: CompanyMapper,
    },
  ],
  exports: ["COMPANY_INFRA_SERVICE"],
})
export class CompanyModule {}
