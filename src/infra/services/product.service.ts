import { IProduct } from "../../domain";
import { IProductMapper } from "../mappers";
import { IProductRepository } from "../repositories";
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
