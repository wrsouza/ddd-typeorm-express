import { IOrderEntity } from "../../entities";
import { IRepository } from "./repository.interface";
import { IFilter } from "./shared.interface";
import { ICompany } from "../../../domain";

export interface IOrderFilter extends IFilter {
  id?: string;
  companyId?: string;
  name?: string;
}

export interface IOrderRepository extends IRepository<IOrderEntity> {
  paginate(params: IOrderFilter): Promise<[IOrderEntity[], number]>;
}
