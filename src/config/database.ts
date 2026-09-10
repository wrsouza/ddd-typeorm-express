import { DataSource } from "typeorm";

let database: DataSource | null = null;

function getDataSource(): DataSource {
  return new DataSource({
    type: "better-sqlite3",
    database: ":memory:",
    entities: [`${__dirname}/../infra/entities/*.entity{.js,.ts}`],
    synchronize: true,
    logging: false,
    dropSchema: true,
  });
}

function init(): DataSource {
  if (!database) {
    database = getDataSource();
  }
  return database;
}

export default init();
