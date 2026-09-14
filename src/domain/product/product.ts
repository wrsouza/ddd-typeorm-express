import { BadRequestException } from "../../common/exceptions";
import { Money } from "../shared";
import { IProduct, IProductData } from "./product.interface";

export class Product implements IProduct {
  private id: string;
  private catalogId: string;
  private sku: string;
  private name: string;
  private price: Money;
  private boxQuantity: number;
  private category: string;

  constructor(data: IProductData) {
    if (!data.id) {
      throw new BadRequestException("product id is required");
    }
    if (!data.sku) {
      throw new BadRequestException("product sku is required");
    }
    if (!data.name) {
      throw new BadRequestException("product name is required");
    }
    if (data.boxQuantity <= 0) {
      throw new BadRequestException(
        "product boxQuantity must be greater than zero",
      );
    }
    this.id = data.id;
    this.catalogId = data.catalogId;
    this.sku = data.sku;
    this.name = data.name;
    this.price = new Money(data.price, data.currency);
    this.boxQuantity = data.boxQuantity;
    this.category = data.category;
  }

  getId(): string {
    return this.id;
  }

  getCatalogId(): string {
    return this.catalogId;
  }

  getSku(): string {
    return this.sku;
  }
  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price.getAmount();
  }

  getCurrency(): string {
    return this.price.getCurrency();
  }

  getBoxQuantity(): number {
    return this.boxQuantity;
  }

  getCategory(): string {
    return this.category;
  }

  toJson(): IProductData {
    return {
      id: this.id,
      catalogId: this.catalogId,
      sku: this.sku,
      name: this.name,
      price: this.price.getAmount(),
      currency: this.price.getCurrency(),
      boxQuantity: this.boxQuantity,
      category: this.category,
    };
  }
}
