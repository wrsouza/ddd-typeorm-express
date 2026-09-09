import { IProduct } from "../../domain/product";

export interface IProductService {
  getAll(): Promise<IProduct[]>;
  getByIds(ids: string[]): Promise<IProduct[]>;
}
