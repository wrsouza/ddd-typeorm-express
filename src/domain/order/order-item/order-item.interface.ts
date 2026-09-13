import { IDiscount } from "../../discount";
import { IProduct, IProductJson } from "../../product";

export interface IOrderItemData {
  id: string;
  product: IProduct;
  discount: IDiscount | null;
  price: number | null;
  quantity: number;
}

export interface IOrderItemJson {
  id: string;
  product: IProductJson;
  price: number;
  quantity: number;
  total: number;
  discount: number;
}

export interface IOrderItem {
  getId(): string;
  getProduct(): IProduct;
  getQuantity(): number;
  getPrice(): number;
  getTotal(): number;
  getDiscount(): number;
  toJson(): IOrderItemJson;
}
