import { Discount } from "../discount";
import {
  IDiscountProgressiveData,
  IDiscountProgressiveRule,
  IProgressiveValue,
} from "./discount-progressive.interface";

export class DiscountProgressive extends Discount {
  private progressiveValues: IProgressiveValue[];

  constructor(data: IDiscountProgressiveData) {
    super("Percentual Value (Progressive)", data.sku);
    this.progressiveValues = data.progressiveValues;
  }

  override getValue(
    quantity: number,
    price: number,
    boxQuantity: number,
  ): number {
    const totalBoxes = Math.floor(quantity / boxQuantity);
    const progressiveValue = this.progressiveValues.find(
      (pv) => totalBoxes >= pv.minimumQuantity,
    );

    if (!progressiveValue) {
      return 0;
    }

    return (quantity * price * progressiveValue.value) / 100;
  }

  override getRules(): IDiscountProgressiveRule {
    return {
      progressiveValues: this.progressiveValues,
    };
  }
}
