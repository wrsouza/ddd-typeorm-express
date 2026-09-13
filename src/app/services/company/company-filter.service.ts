import { Injectable } from "../../../core";
import { CompanyPaginateDto } from "../../dtos";
import { FilterService } from "../shared";
import {
  ICompanyFilter,
  ICompanyFilterService,
} from "./company-filter.interface";

@Injectable()
export class CompanyFilterService
  extends FilterService
  implements ICompanyFilterService
{
  override getFilter(params: CompanyPaginateDto): ICompanyFilter {
    return {
      ...super.getFilter(params),
      ...this.getId(params),
      ...this.getName(params),
      ...this.getCatalogId(params),
    };
  }

  private getId(params: CompanyPaginateDto) {
    const id = params.id;
    if (!id) {
      return {};
    }
    return {
      id,
    };
  }

  private getName(params: CompanyPaginateDto) {
    const name = params.name;
    if (!name) {
      return {};
    }
    return {
      name,
    };
  }

  private getCatalogId(params: CompanyPaginateDto) {
    const catalogId = params.catalogId;
    if (catalogId === undefined) {
      return {};
    }
    return {
      catalogId,
    };
  }
}
