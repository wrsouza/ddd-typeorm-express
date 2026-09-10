import { Repository as EntityRepository, ObjectLiteral } from "typeorm";
import { IRepository } from "./interfaces";

export abstract class Repository<
  T extends ObjectLiteral,
> implements IRepository<T> {
  constructor(protected readonly client: EntityRepository<T>) {}

  async save(data: T): Promise<T> {
    return this.client.save(data);
  }
}
