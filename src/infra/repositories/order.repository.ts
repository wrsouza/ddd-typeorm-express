import { IOrderEntity } from "../entities";
import { IOrderRepository } from "./interfaces";
import { Repository } from "./repository";

export class OrderRepository
  extends Repository<IOrderEntity>
  implements IOrderRepository
{
  getAll(): Promise<IOrderEntity[]> {
    return this.client.find();
  }
}
