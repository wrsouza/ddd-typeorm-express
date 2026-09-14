import { Injectable } from "../../../core";
import { IEmployeeFilter } from "../../../infra/repositories";
import { EmployeePaginateDto } from "../../dtos";
import { FilterService } from "../shared";
import { IEmployeeFilterService } from "./employee-filter.interface";

@Injectable()
export class EmployeeFilterService
  extends FilterService
  implements IEmployeeFilterService
{
  override getFilter(params: EmployeePaginateDto): IEmployeeFilter {
    return {
      ...super.getFilter(params),
      ...this.getCompanyId(params),
      ...this.getId(params),
      ...this.getName(params),
      ...this.getEmail(params),
    };
  }

  private getId(params: EmployeePaginateDto) {
    const id = params.id;
    if (!id) {
      return {};
    }
    return {
      id,
    };
  }

  private getName(params: EmployeePaginateDto) {
    const name = params.name;
    if (!name) {
      return {};
    }
    return {
      name,
    };
  }

  private getEmail(params: EmployeePaginateDto) {
    const email = params.email;
    if (!email) {
      return {};
    }
    return {
      email,
    };
  }

  private getCompanyId(params: EmployeePaginateDto) {
    const companyId = params.companyId;
    if (companyId === undefined) {
      return {};
    }
    return {
      companyId,
    };
  }
}
