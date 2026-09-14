import { database } from "../../config";
import { Module } from "../../core";
import { CompanyEntity } from "../entities";
import { CompanyMapper } from "../mappers";
import { CompanyRepository } from "../repositories";

@Module({
  providers: [
    {
      provide: "COMPANY",
      useValue: database.getRepository(CompanyEntity),
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
  exports: ["COMPANY_REPOSITORY", "COMPANY_MAPPER"],
})
export class CompanyModule {}
