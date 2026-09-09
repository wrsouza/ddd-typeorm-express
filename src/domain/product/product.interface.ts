export interface IProductData {
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
}
