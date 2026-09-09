import { ICompanyEntity } from "../../entities";
import { Repository } from "./repository";
import { ICompanyRepository } from "./company.interface";

export class CompanyRepository
  extends Repository<ICompanyEntity>
  implements ICompanyRepository
{
  async getById(id: string): Promise<ICompanyEntity | null> {
    return this.client.findOneBy({ id });
  }
}
