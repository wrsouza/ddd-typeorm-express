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

  async getByIds(ids: string[], catalogId: string): Promise<IProduct[]> {
    const products = await this.productRepository.getByIds(ids);
    return products.map((product) =>
      this.productMapper.toDomain(product, catalogId),
    );
  }

  async findByCatalogIds(catalogIds: string[]): Promise<IProduct[]> {
    const products = await this.productRepository.findByCatalogIds(catalogIds);
    let productsMapped: IProduct[] = [];
    for (const catalogId of catalogIds) {
      const filteredProducts = products.filter((product) =>
        product.prices?.find((p) => p.catalogId === catalogId),
      );
      productsMapped = [
        ...productsMapped,
        ...filteredProducts.map((product) =>
          this.productMapper.toDomain(product, catalogId),
        ),
      ];
    }
    return productsMapped;
  }
}
