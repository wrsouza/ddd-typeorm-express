import { DataSource } from "typeorm";

let database: DataSource | null = null;

function isTest(): boolean {
  return process.env.NODE_ENV === "test";
}

function getDataSource(): DataSource {
  return new DataSource({
    type: "better-sqlite3",
    database: isTest() ? ":memory:" : "./database.db",
    entities: [`${__dirname}/../infra/entities/*.entity{.js,.ts}`],
    synchronize: true,
    logging: false,
    dropSchema: isTest(),
  });
}

function init(): DataSource {
  if (!database) {
    database = getDataSource();
  }
  return database;
}

export default init();
