import { BadRequestException } from "../../../common/exceptions";
import { Discount } from "../discount";
import {
  IDiscountPercentualData,
  IDiscountPercentualRule,
} from "./discount-percentual.interface";

export class DiscountPercentual extends Discount {
  private percentage: number;
  private minimumQuantity: number;

  constructor(data: IDiscountPercentualData) {
    super("Percentual Value (Direct)", data.sku);
    if (data.percentage < 0 || data.percentage > 100) {
      throw new BadRequestException(
        "discount percentage must be between 0 and 100",
      );
    }
    if (data.minimumQuantity < 0) {
      throw new BadRequestException(
        "discount minimumQuantity cannot be negative",
      );
    }
    this.percentage = data.percentage;
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

    return (quantity * price * this.percentage) / 100;
  }

  override getRules(): IDiscountPercentualRule {
    return {
      percentage: this.percentage,
      minimumQuantity: this.minimumQuantity,
    };
  }
}
