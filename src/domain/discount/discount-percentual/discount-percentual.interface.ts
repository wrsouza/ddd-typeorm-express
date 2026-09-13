export interface IDiscountPercentualData {
  sku: string;
  percentage: number;
  minimumQuantity: number;
}

export interface IDiscountPercentualRule {
  percentage: number;
  minimumQuantity: number;
}
