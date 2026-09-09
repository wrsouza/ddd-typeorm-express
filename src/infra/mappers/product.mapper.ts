import { IProductEntity } from "../../entities";
import { IProduct, Product } from "../../domain/product";
import { IProductMapper } from "./product.interface";

export class ProductMapper implements IProductMapper {
  toDomain(data: IProductEntity): IProduct {
    return new Product({
      id: data.id,
      sku: data.sku,
      name: data.name,
      price: data.price,
      category: data.category,
    });
  }
}
