import { In } from "typeorm";
import { IProductEntity } from "../../entities";
import { Repository } from "./repository";
import { IProductRepository } from "./product.interface";

export class ProductRepository
  extends Repository<IProductEntity>
  implements IProductRepository
{
  async getAll(): Promise<IProductEntity[]> {
    return this.client.find();
  }

  async getByIds(ids: string[]): Promise<IProductEntity[]> {
    return this.client.findBy({ id: In(ids) });
  }
}
