import { IProduct } from "../../../domain";
import { IProductEntity } from "../../entities";

export interface IProductMapper {
  toDomain(data: IProductEntity, catalogId: string): IProduct;
}
