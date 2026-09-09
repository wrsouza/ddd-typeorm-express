import { IProductEntity } from "../entities";
import { IProductRepository } from "./product.interface";
import { Repository } from "./repository";

export class ProductRepository
  extends Repository<IProductEntity>
  implements IProductRepository
{
  async getAll(): Promise<IProductEntity[]> {
    return Promise.resolve([]);
  }

  async getByIds(ids: string[]): Promise<IProductEntity[]> {
    return Promise.resolve([]);
  }
}
