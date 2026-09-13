import { IDiscountEntity } from "../../entities";
import { IRepository } from "./repository.interface";

export interface IDiscountRepository extends IRepository<IDiscountEntity> {
  getByCompanyId(id: string): Promise<IDiscountEntity[] | null>;
}
