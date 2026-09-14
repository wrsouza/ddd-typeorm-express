import { Injectable } from "../../core";
import { IOrderEntity } from "../entities";
import { IOrderRepository, IOrderFilter } from "./interfaces";
import { Repository } from "./repository";
import type { FindOptionsWhere } from "typeorm";
import { ILike } from "typeorm";

@Injectable()
export class OrderRepository
  extends Repository<IOrderEntity>
  implements IOrderRepository
{
  protected override getPaginateWhere(
    params: IOrderFilter,
  ): FindOptionsWhere<IOrderEntity> {
    return {
      companyId: params.companyId,
      ...this.getPaginateId(params),
      ...this.getPaginateName(params),
    };
  }

  private getPaginateId(params: IOrderFilter): FindOptionsWhere<IOrderEntity> {
    if (!params.id) {
      return {};
    }
    return { id: params.id };
  }

  private getPaginateName(
    params: IOrderFilter,
  ): FindOptionsWhere<IOrderEntity> {
    if (!params.name) {
      return {};
    }
    return { name: ILike(`%${params.name}%`) };
  }
}
