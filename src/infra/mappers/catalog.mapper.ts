import { Injectable } from "../../core";
import { Catalog, ICatalog, ICompany, IProduct } from "../../domain";
import { ICatalogEntity } from "../entities";
import { ICatalogMapper } from "./interfaces";

@Injectable()
export class CatalogMapper implements ICatalogMapper {
  toDomain(
    data: ICatalogEntity,
    companies: ICompany[],
    products: IProduct[],
  ): ICatalog {
    return new Catalog({
      id: data.id,
      name: data.name,
      companies,
      products,
    });
  }
}
