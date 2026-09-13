import { FindOptionsWhere, ILike } from "typeorm";
import { ICatalogFilter } from "../../app/services";
import { Injectable } from "../../core";
import { ICatalogEntity } from "../entities";
import { ICatalogRepository } from "./interfaces";
import { Repository } from "./repository";

@Injectable()
export class CatalogRepository
  extends Repository<ICatalogEntity>
  implements ICatalogRepository
{
  override notFoundMessage: string = "catalog not found";

  protected override getPaginateWhere(
    params: ICatalogFilter,
  ): FindOptionsWhere<ICatalogEntity> {
    return {
      ...this.getPaginateId(params),
      ...this.getPaginateName(params),
    };
  }

  private getPaginateId(
    params: ICatalogFilter,
  ): FindOptionsWhere<ICatalogEntity> {
    if (!params.id) {
      return {};
    }
    return { id: params.id };
  }

  private getPaginateName(
    params: ICatalogFilter,
  ): FindOptionsWhere<ICatalogEntity> {
    if (!params.name) {
      return {};
    }
    return { name: ILike(`%${params.name}%`) };
  }
}
