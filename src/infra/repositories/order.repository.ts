import { IOrderEntity } from "../../entities";
import { Repository } from "./repository";
import { IOrderRepository } from "./order.interface";

export class OrderRepository
  extends Repository<IOrderEntity>
  implements IOrderRepository
{
  getAll(): Promise<IOrderEntity[]> {
    return this.client.find();
  }
}
