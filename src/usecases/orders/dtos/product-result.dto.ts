import type { IProductJson } from "../../../domain";

export class ProductResultDto {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly price: number;
  readonly category: string;

  constructor(data: IProductJson) {
    this.id = data.id;
    this.sku = data.sku;
    this.name = data.name;
    this.price = data.price;
    this.category = data.category;
  }
}
