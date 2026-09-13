import { Inject, Injectable } from "../../core";
import { IProduct } from "../../domain";
import { IProductMapper } from "../mappers";
import { IProductRepository } from "../repositories";
import { IProductService } from "./interfaces";

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject("PRODUCT_REPOSITORY")
    private readonly productRepository: IProductRepository,
    @Inject("PRODUCT_MAPPER")
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

  async findByCatalogIds(catalogIds: string[]): Promise<IProduct[]> {
    const products = await this.productRepository.findByCatalogIds(catalogIds);
    return products.map((product) => this.productMapper.toDomain(product));
  }
}
