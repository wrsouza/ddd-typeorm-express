import { IOrderEntity } from "../entities";
import { IRepository } from "./repository.interface";

export interface IOrderRepository extends IRepository<IOrderEntity> {
  getAll(): Promise<IOrderEntity[]>;
}
