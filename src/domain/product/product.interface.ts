import { IProductEntity } from "../../entities";

export interface IProductData {
  id: string;
  sku: string;
  name: string;
  price: number;
  category: string;
}

export interface IProductJson {
  id: string;
  sku: string;
  name: string;
  price: number;
  category: string;
}

export interface IProduct {
  getId(): string;
  getSku(): string;
  getName(): string;
  getPrice(): number;
  getCategory(): string;
  toJson(): IProductJson;
}

export interface IProductMapper {
  toDomain(data: IProductEntity): IProduct;
}

export interface IProductService {
  getAll(): Promise<IProduct[]>;
  getByIds(ids: string[]): Promise<IProduct[]>;
}
