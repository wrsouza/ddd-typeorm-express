import { IProductEntity } from "../entities";
import { IProductRepository } from "./product.interface";
import { Repository } from "./repository";
import { In } from "typeorm";

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
