import { FindOptionsWhere, ILike, In, IsNull } from "typeorm";
import { Injectable } from "../../core";
import { ICompanyEntity } from "../entities";
import { ICompanyFilter, ICompanyRepository } from "./interfaces";
import { Repository } from "./repository";

@Injectable()
export class CompanyRepository
  extends Repository<ICompanyEntity>
  implements ICompanyRepository
{
  override notFoundMessage: string = "company not found";

  protected override getPaginateWhere(
    params: ICompanyFilter,
  ): FindOptionsWhere<ICompanyEntity> {
    return {
      ...this.getPaginateId(params),
      ...this.getPaginateName(params),
      ...this.getPaginateCatalogId(params),
    };
  }

  private getPaginateId(
    params: ICompanyFilter,
  ): FindOptionsWhere<ICompanyEntity> {
    if (!params.id) {
      return {};
    }
    return { id: params.id };
  }

  private getPaginateName(
    params: ICompanyFilter,
  ): FindOptionsWhere<ICompanyEntity> {
    if (!params.name) {
      return {};
    }
    return { name: ILike(`%${params.name}%`) };
  }

  private getPaginateCatalogId(
    params: ICompanyFilter,
  ): FindOptionsWhere<ICompanyEntity> {
    if (params.catalogId === undefined) {
      return {};
    }
    if (params.catalogId === null) {
      return { catalogId: IsNull() };
    }
    return { catalogId: params.catalogId };
  }

  async findByCatalogIds(catalogIds: string[]): Promise<ICompanyEntity[]> {
    return this.client.find({
      where: {
        catalogId: In(catalogIds),
      },
    });
  }

  async findByEmployeeId(employeeId: string): Promise<ICompanyEntity | null> {
    return this.client.findOneBy({
      employees: {
        id: employeeId,
      },
    });
  }
}
