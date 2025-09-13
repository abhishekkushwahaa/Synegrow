import "reflect-metadata";
import { DataSource } from "typeorm";
import { Supplier } from "../entities/Supplier";
import { Product } from "../entities/Product";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Supplier, Product],
  migrations: [],
  subscribers: [],
});
