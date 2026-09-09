import { IProduct } from "../../domain/product";
import { IProductMapper } from "../mappers/product.mapper";
import { IProductRepository } from "../repositories/product.interface";
import { IProductService } from "./product.interface";

export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly productMapper: IProductMapper,
  ) {}

  async getAll(): Promise<IProduct[]> {
    const products = await this.productRepository.getAll();
    return products.map((product) => this.productMapper.toDomain(product));
  }

  async getByIds(ids: string[]): Promise<IProduct[]> {
    const products = await this.productRepository.getByIds(ids);
    return products.map((product) => this.productMapper.toDomain(product));
  }
}
