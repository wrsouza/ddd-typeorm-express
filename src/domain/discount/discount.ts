import { BadRequestException } from "../../common/exceptions";
import { IDiscount, IDiscountJson, IDiscountRule } from "./discount.interface";

export abstract class Discount implements IDiscount {
  protected type: string;
  protected sku: string;

  constructor(type: string, sku: string) {
    if (!sku) {
      throw new BadRequestException("discount sku is required");
    }
    this.type = type;
    this.sku = sku;
  }

  public getType(): string {
    return this.type;
  }

  public getSku(): string {
    return this.sku;
  }

  public abstract getValue(
    quantity: number,
    price: number,
    boxQuantity: number,
  ): number;

  protected abstract getRules(): IDiscountRule;

  public toJson(): IDiscountJson {
    return {
      type: this.type,
      sku: this.sku,
      rules: this.getRules(),
    };
  }
}
