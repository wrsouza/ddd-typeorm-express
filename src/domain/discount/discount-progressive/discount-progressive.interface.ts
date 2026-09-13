export interface IProgressiveValue {
  minimumQuantity: number;
  value: number;
}

export interface IDiscountProgressiveData {
  sku: string;
  progressiveValues: IProgressiveValue[];
}

export interface IDiscountProgressiveRule {
  progressiveValues: IProgressiveValue[];
}
