import { IDiscountFixedRule } from "./discount-fixed";
import { IDiscountPercentualRule } from "./discount-percentual";
import { IDiscountProgressiveRule } from "./discount-progressive";

export type IDiscountRule =
  | IDiscountFixedRule
  | IDiscountPercentualRule
  | IDiscountProgressiveRule;

export interface IDiscountJson {
  type: string;
  sku: string;
  rules: IDiscountRule;
}

export interface IDiscount {
  getType(): string;
  getSku(): string;
  getValue(quantity: number, price: number, boxQuantity: number): number;
  toJson(): IDiscountJson;
}
