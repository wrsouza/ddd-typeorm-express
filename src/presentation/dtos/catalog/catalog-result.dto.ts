import { ICatalogJson } from "../../../domain";

export class CatalogResultDto {
  readonly data: ICatalogJson;

  constructor(data: ICatalogJson) {
    this.data = data;
  }
}
