import { ILike } from "typeorm";
import { Injectable } from "../../../core";
import { CatalogPaginateDto } from "../../dtos/catalog";
import { FilterService } from "../filters";
import {
  ICatalogFilter,
  ICatalogFilterService,
} from "./catalog-filter.interface";

@Injectable()
export class CatalogFilterService
  extends FilterService
  implements ICatalogFilterService
{
  override getFilter(params: CatalogPaginateDto): ICatalogFilter {
    return {
      ...super.getFilter(params),
      ...this.getId(params),
      ...this.getName(params),
    };
  }

  private getId(params: CatalogPaginateDto) {
    const id = params.id;
    if (!id) {
      return {};
    }
    return {
      id,
    };
  }

  private getName(params: CatalogPaginateDto) {
    const name = params.name;
    if (!name) {
      return {};
    }
    return {
      name: ILike(`%${name.toLowerCase()}%`),
    };
  }
}
