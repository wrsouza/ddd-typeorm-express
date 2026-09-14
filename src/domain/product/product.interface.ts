export interface IProductPrice {
  catalogId: string;
  currency: string;
  price: number;
}

export interface IProductData extends IProductPrice {
  id: string;
  sku: string;
  name: string;
  boxQuantity: number;
  category: string;
}

export interface IProductJson extends IProductPrice {
  id: string;
  sku: string;
  name: string;
  boxQuantity: number;
  category: string;
}

export interface IProduct {
  getId(): string;
  getCatalogId(): string;
  getSku(): string;
  getName(): string;
  getPrice(): number;
  getCurrency(): string;
  getBoxQuantity(): number;
  getCategory(): string;
  toJson(): IProductJson;
}
