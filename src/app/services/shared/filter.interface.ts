import { IFilter, IFilterData } from "../../../infra/repositories";

export interface IFilterService {
  getFilter(params: IFilterData): IFilter;
}
