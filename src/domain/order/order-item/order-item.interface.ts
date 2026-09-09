import { IProduct, IProductJson } from "../../product/product.interface";

export interface IOrderItemData {
  id: string;
  product: IProduct;
  price: number;
  quantity: number;
}

export interface IOrderItemJson {
  id: string;
  product: IProductJson;
  price: number;
  quantity: number;
  total: number;
}

export interface IOrderItem {
  getId(): string;
  getProduct(): IProduct;
  getQuantity(): number;
  getPrice(): number;
  getTotal(): number;
  toJson(): IOrderItemJson;
}
