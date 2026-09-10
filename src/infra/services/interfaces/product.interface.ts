import { IProduct } from "../../../domain";

export interface IProductService {
  getAll(): Promise<IProduct[]>;
  getByIds(ids: string[]): Promise<IProduct[]>;
}
