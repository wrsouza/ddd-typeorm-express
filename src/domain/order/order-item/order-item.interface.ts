import { IProduct } from "../../product/product.interface";

export interface IOrderItemData {
  id: string;
  product: IProduct;
  price: number;
  quantity: number;
}

export interface IOrderItem {
  getId(): string;
  getProduct(): IProduct;
  getQuantity(): number;
  getPrice(): number;
  getTotal(): number;
}
