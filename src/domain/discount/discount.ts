import { IDiscount, IDiscountJson, IDiscountRule } from "./discount.interface";

export abstract class Discount implements IDiscount {
  protected type: string;
  protected sku: string;

  constructor(type: string, sku: string) {
    this.type = type;
    this.sku = sku;
  }

  public getType(): string {
    return this.type;
  }

  public getSku(): string {
    return this.sku;
  }

  public getValue(
    quantity: number,
    price: number,
    boxQuantity: number,
  ): number {
    throw new Error("Method not implemented");
  }

  protected getRules(): IDiscountRule {
    throw new Error("Method not implemented");
  }

  public toJson(): IDiscountJson {
    return {
      type: this.type,
      sku: this.sku,
      rules: this.getRules(),
    };
  }
}
