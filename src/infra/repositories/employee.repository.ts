import { FindOptionsWhere, ILike } from "typeorm";
import { Injectable } from "../../core";
import { IEmployeeEntity } from "../entities";
import { IEmployeeFilter, IEmployeeRepository } from "./interfaces";
import { Repository } from "./repository";

@Injectable()
export class EmployeeRepository
  extends Repository<IEmployeeEntity>
  implements IEmployeeRepository
{
  override notFoundMessage: string = "employee not found";

  protected override getPaginateWhere(
    params: IEmployeeFilter,
  ): FindOptionsWhere<IEmployeeEntity> {
    return {
      ...this.getPaginateId(params),
      ...this.getPaginateName(params),
      ...this.getPaginateEmail(params),
    };
  }

  private getPaginateId(
    params: IEmployeeFilter,
  ): FindOptionsWhere<IEmployeeEntity> {
    if (!params.id) {
      return {};
    }
    return { id: params.id };
  }

  private getPaginateName(
    params: IEmployeeFilter,
  ): FindOptionsWhere<IEmployeeEntity> {
    if (!params.name) {
      return {};
    }
    return { name: ILike(`%${params.name}%`) };
  }

  async findByEmail(email: string): Promise<IEmployeeEntity | null> {
    return this.client.findOneBy({ email } as FindOptionsWhere<IEmployeeEntity>);
  }

  private getPaginateEmail(
    params: IEmployeeFilter,
  ): FindOptionsWhere<IEmployeeEntity> {
    if (!params.email) {
      return {};
    }
    return { email: ILike(`%${params.email}%`) };
  }
}
