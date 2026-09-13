import { Injectable } from "../../core";
import { IDiscountEntity } from "../entities";
import { IDiscountRepository } from "./interfaces/discount.interface";
import { Repository } from "./repository";

@Injectable()
export class DiscountRepository
  extends Repository<IDiscountEntity>
  implements IDiscountRepository
{
  async getByCompanyId(companyId: string): Promise<IDiscountEntity[] | null> {
    return this.client.find({
      relations: {
        products: true,
        progressiveValues: true,
        companies: true,
      },
      where: {
        companies: {
          id: companyId,
        },
      },
    });
  }
}
