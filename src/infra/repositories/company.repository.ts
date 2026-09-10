import { ICompanyEntity } from "../entities";
import { ICompanyRepository } from "./interfaces";
import { Repository } from "./repository";

export class CompanyRepository
  extends Repository<ICompanyEntity>
  implements ICompanyRepository
{
  async getById(id: string): Promise<ICompanyEntity | null> {
    return this.client.findOneBy({ id });
  }
}
