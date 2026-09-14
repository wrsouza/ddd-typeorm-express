import { IProduct } from "../../../domain";

export interface IProductApplicationService {
  getByIds(ids: string[], catalogId: string): Promise<IProduct[]>;
  findByCatalogIds(catalogIds: string[]): Promise<IProduct[]>;
}
