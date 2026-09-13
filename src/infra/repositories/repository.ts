import {
  Repository as EntityRepository,
  FindOptionsWhere,
  In,
  ObjectLiteral,
} from "typeorm";
import { IRepository } from "./interfaces";

export abstract class Repository<
  T extends ObjectLiteral,
> implements IRepository<T> {
  constructor(protected readonly client: EntityRepository<T>) {}

  async getAll(): Promise<T[]> {
    console.log(this.client);
    return this.client.find();
  }

  async getById(id: string): Promise<T | null> {
    return this.client.findOneBy({ id } as FindOptionsWhere<ObjectLiteral>);
  }

  async getByIds(ids: string[]): Promise<T[]> {
    return this.client.findBy({
      id: In(ids),
    } as FindOptionsWhere<ObjectLiteral>);
  }

  async save(data: T): Promise<T> {
    return this.client.save(data);
  }
}
