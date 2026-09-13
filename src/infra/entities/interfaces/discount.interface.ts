import { ICompanyEntity } from "./company.interface";
import { IDiscountProgressiveValueEntity } from "./discount-progressive-value.interface";
import { IProductEntity } from "./product.interface";

export interface IDiscountEntity {
  id: string;
  name: string;
  type: string;
  minimumQuantity: number | null;
  percentage: number | null;
  value: number | null;
  products: IProductEntity[];
  companies: ICompanyEntity[];
  progressiveValues: IDiscountProgressiveValueEntity[];
}
