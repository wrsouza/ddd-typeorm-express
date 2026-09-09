import { IProduct } from "../../../domain/product";

export class ProductResultDto {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly price: number;
  readonly category: string;

  private constructor(product: IProduct) {
    this.id = product.getId();
    this.sku = product.getSku();
    this.name = product.getName();
    this.price = product.getPrice();
    this.category = product.getCategory();
  }

  static fromDomain(product: IProduct): ProductResultDto {
    return new ProductResultDto(product);
  }
}
