import { BadRequestException } from "../../../common/exceptions";
import { Discount } from "../discount";
import {
  IDiscountFixedData,
  IDiscountFixedRule,
} from "./discount-fixed.interface";

export class DiscountFixed extends Discount {
  private value: number;
  private minimumQuantity: number;

  constructor(data: IDiscountFixedData) {
    super("Fixed Value (Direct)", data.sku);
    if (data.value < 0) {
      throw new BadRequestException("discount value cannot be negative");
    }
    if (data.minimumQuantity < 0) {
      throw new BadRequestException(
        "discount minimumQuantity cannot be negative",
      );
    }
    this.sku = data.sku;
    this.value = data.value;
    this.minimumQuantity = data.minimumQuantity;
  }

  override getValue(
    quantity: number,
    price: number,
    boxQuantity: number,
  ): number {
    if (quantity < this.minimumQuantity) {
      return 0;
    }
    const totalBoxes = Math.floor(quantity / boxQuantity);
    return this.value * totalBoxes;
  }

  override getRules(): IDiscountFixedRule {
    return {
      value: this.value,
      minimumQuantity: this.minimumQuantity,
    };
  }
}
