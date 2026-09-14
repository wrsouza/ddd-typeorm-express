import { IProduct, IProductData } from "./product.interface";

export class Product implements IProduct {
  private id: string;
  private catalogId: string;
  private sku: string;
  private name: string;
  private price: number;
  private currency: string;
  private boxQuantity: number;
  private category: string;

  constructor(data: IProductData) {
    this.id = data.id;
    this.catalogId = data.catalogId;
    this.sku = data.sku;
    this.name = data.name;
    this.price = data.price;
    this.currency = data.currency;
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
    return this.price;
  }

  getCurrency(): string {
    return this.currency;
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
      price: this.price,
      currency: this.currency,
      boxQuantity: this.boxQuantity,
      category: this.category,
    };
  }
}
