import { NotFoundException } from "../../common/exceptions";
import { Inject, Injectable } from "../../core";
import { ICatalog, ICompany, IProduct } from "../../domain";
import { ICatalogEntity } from "../entities";
import { ICatalogMapper } from "../mappers";
import { ICatalogFilter, ICatalogRepository } from "../repositories";
import {
  ICatalogService,
  ICompanyService,
  IProductService,
} from "./interfaces";

@Injectable()
export class CatalogService implements ICatalogService {
  constructor(
    @Inject("CATALOG_REPOSITORY")
    private readonly catalogRepository: ICatalogRepository,
    @Inject("CATALOG_MAPPER")
    private readonly catalogMapper: ICatalogMapper,
    @Inject("COMPANY_INFRA_SERVICE")
    private readonly companyService: ICompanyService,
    @Inject("PRODUCT_INFRA_SERVICE")
    private readonly productService: IProductService,
  ) {}

  async paginate(filters: ICatalogFilter): Promise<[ICatalog[], number]> {
    const [catalogs, total] = await this.catalogRepository.paginate(filters);
    const catalogIds = catalogs.map((catalog) => catalog.id);
    const [companies, products] = await this.getByCatalogIds(catalogIds);
    const catalogMapped = catalogs.map((catalog) =>
      this.catalogMapper.toDomain(
        catalog,
        companies.filter((company) => company.getCatalogId() === catalog.id),
        products.filter((product) => product.getCatalogId() === catalog.id),
      ),
    );
    return [catalogMapped, total];
  }

  async findById(id: string): Promise<ICatalog> {
    const catalog = await this.catalogRepository.getById(id);
    if (!catalog) {
      throw new NotFoundException("catalog not found");
    }
    const [companies, products] = await this.getByCatalogIds([catalog.id]);
    return this.catalogMapper.toDomain(catalog, companies, products);
  }

  async create(data: Partial<ICatalogEntity>): Promise<ICatalog> {
    const catalog = await this.catalogRepository.create(data);
    return this.catalogMapper.toDomain(catalog, [], []);
  }

  async update(id: string, data: Partial<ICatalogEntity>): Promise<ICatalog> {
    const catalog = await this.catalogRepository.update(id, data);
    const [companies, products] = await this.getByCatalogIds([catalog.id]);
    return this.catalogMapper.toDomain(catalog, companies, products);
  }

  async delete(id: string): Promise<void> {
    await this.catalogRepository.delete(id);
  }

  private async getByCatalogIds(
    catalogIds: string[],
  ): Promise<[ICompany[], IProduct[]]> {
    return Promise.all([
      this.companyService.findByCatalogIds(catalogIds),
      this.productService.findByCatalogIds(catalogIds),
    ]);
  }
}
