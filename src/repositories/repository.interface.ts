export interface IRepository<T> {
  save(data: T): Promise<T>;
}
