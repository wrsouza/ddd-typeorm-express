import { IProduct } from "../../../domain";

export interface IProductService {
  getByIds(ids: string[], catalogId: string): Promise<IProduct[]>;
  findByCatalogIds(catalogIds: string[]): Promise<IProduct[]>;
}
