export interface ISort {
  sort: string;
  order: { [key: string]: "ASC" | "DESC" };
}

export interface IFilter extends ISort {
  page: number;
  limit: number;
}

export interface IFilterData {
  sort: string;
  page: number;
  limit: number;
}

export interface IFilterService {
  getFilter(params: IFilterData): IFilter;
}
