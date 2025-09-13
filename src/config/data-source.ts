import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product, Supplier } from "../entities/Entities";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [Supplier, Product],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
