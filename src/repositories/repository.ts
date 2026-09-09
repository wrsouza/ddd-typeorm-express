import { Repository as EntityRepository, ObjectLiteral } from "typeorm";

export abstract class Repository<T extends ObjectLiteral> {
  constructor(protected readonly client: EntityRepository<T>) {}

  async save(data: T): Promise<T> {
    return this.client.save(data);
  }
}
