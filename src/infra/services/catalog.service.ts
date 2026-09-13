import { ICatalogFilter } from "../../app/services";
import { Inject, Injectable } from "../../core";
import { ICatalog } from "../../domain";
import { ICatalogMapper } from "../mappers";
import { ICatalogRepository } from "../repositories";
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
    const companies = await this.companyService.findByCatalogIds(catalogIds);
    const products = await this.productService.findByCatalogIds(catalogIds);
    const catalogMapped = catalogs.map((catalog) =>
      this.catalogMapper.toDomain(
        catalog,
        companies.filter((company) => company.getCatalogId() === catalog.id),
        products.filter((product) => product.getCatalogId() === catalog.id),
      ),
    );
    return [catalogMapped, total];
  }
}
