import { NotFoundException } from "../../common/exceptions";
import { Injectable } from "../../core";
import { IProduct, Product } from "../../domain/product";
import { IProductEntity } from "../entities";
import { IProductMapper } from "./interfaces/product.interface";

@Injectable()
export class ProductMapper implements IProductMapper {
  toDomain(data: IProductEntity, catalogId: string): IProduct {
    const priceFound = data.prices?.find(
      (price) => price.catalogId === catalogId,
    );

    if (!priceFound) {
      throw new NotFoundException("catalog price not found");
    }

    return new Product({
      id: data.id,
      catalogId,
      price: priceFound.price,
      currency: priceFound.currency,
      sku: data.sku,
      name: data.name,
      boxQuantity: 1,
      category: data.category,
    });
  }
}
