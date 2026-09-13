import { In } from "typeorm";
import { Injectable } from "../../core";
import { ICompanyEntity } from "../entities";
import { ICompanyRepository } from "./interfaces";
import { Repository } from "./repository";

@Injectable()
export class CompanyRepository
  extends Repository<ICompanyEntity>
  implements ICompanyRepository
{
  async findByCatalogIds(catalogIds: string[]): Promise<ICompanyEntity[]> {
    return this.client.find({
      where: {
        catalogId: In(catalogIds),
      },
    });
  }
}
