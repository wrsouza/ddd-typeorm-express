export interface IMoney {
  getAmount(): number;
  getCurrency(): string;
  add(other: IMoney): IMoney;
  subtract(other: IMoney): IMoney;
  multiply(factor: number): IMoney;
  percentage(percent: number): IMoney;
  equals(other: IMoney): boolean;
}
