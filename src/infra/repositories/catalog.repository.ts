import { ICatalogFilter } from "../../app/services";
import { Injectable } from "../../core";
import { ICatalogEntity } from "../entities";
import { ICatalogRepository } from "./interfaces";
import { Repository } from "./repository";

@Injectable()
export class CatalogRepository
  extends Repository<ICatalogEntity>
  implements ICatalogRepository
{
  async paginate(params: ICatalogFilter): Promise<[ICatalogEntity[], number]> {
    const id = params.id ? { id: params.id } : {};
    const name = params.name ? { name: params.name } : {};
    const skip = (params.page - 1) * params.limit;
    const take = params.limit;
    return this.client.findAndCount({
      where: {
        ...id,
        ...name,
      },
      order: params.order,
      skip,
      take,
    });
  }
}
