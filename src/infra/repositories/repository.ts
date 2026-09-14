import {
  Repository as EntityRepository,
  FindOptionsOrder,
  FindOptionsWhere,
  In,
  ObjectLiteral,
} from "typeorm";
import { NotFoundException } from "../../common/exceptions";
import { IFilter, IRepository } from "./interfaces";

export abstract class Repository<
  T extends ObjectLiteral,
> implements IRepository<T> {
  protected notFoundMessage: string = "not found";

  constructor(protected readonly client: EntityRepository<T>) {}

  async paginate(params: IFilter): Promise<[T[], number]> {
    const where = this.getPaginateWhere(params);
    const order = params.order as FindOptionsOrder<T>;
    const skip = (params.page - 1) * params.limit;
    const take = params.limit;
    return this.client.findAndCount({
      where,
      order,
      skip,
      take,
    });
  }

  protected getPaginateWhere(params: IFilter): FindOptionsWhere<T> {
    return {};
  }

  async save(data: T): Promise<T> {
    return this.client.save(data);
  }

  async create(data: T): Promise<T> {
    const entity = this.client.create(data);
    return this.save(entity);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const entity = await this.getById(id);
    Object.assign(entity, data);
    return this.save(entity);
  }

  async getAll(): Promise<T[]> {
    console.log(this.client);
    return this.client.find();
  }

  async getById(id: string): Promise<T> {
    const entity = await this.client.findOneBy({
      id,
    } as FindOptionsWhere<ObjectLiteral>);
    if (!entity) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return entity;
  }

  async getByIds(ids: string[]): Promise<T[]> {
    return this.client.findBy({
      id: In(ids),
    } as FindOptionsWhere<ObjectLiteral>);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.client.delete(id);
  }
}
