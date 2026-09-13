import { Injectable } from "../../core";
import { IProduct, Product } from "../../domain/product";
import { IProductEntity } from "../entities";
import { IProductMapper } from "./interfaces/product.interface";

@Injectable()
export class ProductMapper implements IProductMapper {
  toDomain(data: IProductEntity): IProduct {
    return new Product({
      id: data.id,
      catalogId: data.catalogId,
      sku: data.sku,
      name: data.name,
      price: data.price,
      boxQuantity: 1,
      category: data.category,
    });
  }
}
