export interface IDiscountFixedData {
  sku: string;
  value: number;
  minimumQuantity: number;
}

export interface IDiscountFixedRule {
  minimumQuantity: number;
  value: number;
}
