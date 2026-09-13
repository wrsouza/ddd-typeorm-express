export interface IProductData {
  id: string;
  catalogId: string;
  sku: string;
  name: string;
  price: number;
  boxQuantity: number;
  category: string;
}

export interface IProductJson {
  id: string;
  catalogId: string;
  sku: string;
  name: string;
  price: number;
  boxQuantity: number;
  category: string;
}

export interface IProduct {
  getId(): string;
  getCatalogId(): string;
  getSku(): string;
  getName(): string;
  getPrice(): number;
  getBoxQuantity(): number;
  getCategory(): string;
  toJson(): IProductJson;
}
