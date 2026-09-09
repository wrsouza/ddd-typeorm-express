import { IOrderItemEntity } from "../../entities";
import { IProduct, IProductJson } from "../product/product.interface";

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
  getQuantity(): number;
  getPrice(): number;
  getTotal(): number;
  toJson(): IOrderItemJson;
}

export interface IOrderItemMapper {
  toDomain(data: IOrderItemEntity, product: IProduct): IOrderItem;
}

export interface IOrderItemService {
  handle(list: IOrderItemEntity[], products: IProduct[]): IOrderItem[];
}
