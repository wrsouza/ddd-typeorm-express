export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  getByIds(ids: string[]): Promise<T[]>;
  save(data: T): Promise<T>;
}
