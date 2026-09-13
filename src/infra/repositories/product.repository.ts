import { In } from "typeorm";
import { Injectable } from "../../core";
import { IProductEntity } from "../entities";
import { IProductRepository } from "./interfaces";
import { Repository } from "./repository";

@Injectable()
export class ProductRepository
  extends Repository<IProductEntity>
  implements IProductRepository
{
  async findByCatalogIds(catalogIds: string[]): Promise<IProductEntity[]> {
    return this.client.find({
      where: {
        catalogId: In(catalogIds),
      },
    });
  }
}
