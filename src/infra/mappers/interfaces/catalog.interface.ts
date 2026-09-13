import { ICatalog, ICompany, IProduct } from "../../../domain";
import { ICatalogEntity } from "../../entities";

export interface ICatalogMapper {
  toDomain(
    data: ICatalogEntity,
    companies: ICompany[],
    products: IProduct[],
  ): ICatalog;
}
