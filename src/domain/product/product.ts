import { IProduct, IProductData } from "./product.interface";

export class Product implements IProduct {
  private id: string;
  private sku: string;
  private name: string;
  private price: number;
  private category: string;

  constructor(data: IProductData) {
    if (!data.id) {
      throw new Error("product id is required");
    }
    if (!data.name) {
      throw new Error("product name is required");
    }
    if (data.price < 0) {
      throw new Error("product price cannot be negative");
    }

    this.id = data.id;
    this.sku = data.sku;
    this.name = data.name;
    this.price = data.price;
    this.category = data.category;
  }

  getId(): string {
    return this.id;
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

  getCategory(): string {
    return this.category;
  }

  toJson(): IProductData {
    return {
      id: this.id,
      sku: this.sku,
      name: this.name,
      price: this.price,
      category: this.category,
    };
  }
}
