import "reflect-metadata";
import { AppError } from "./src/utils/Error";
import { AppDataSource } from "./src/config/data-source";
import supplierRoutes from "./src/api/routes/SupplierRoutes";
import productRoutes from "./src/api/routes/productRoutes";
import type { NextFunction, Request, Response } from "express";
import express, { type Express } from "express";

const app: Express = express();
const port = process.env.API_PORT || 3000;

app.use(express.json());

// Routes
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  }

  console.error("UNEXPECTED ERROR: ", err);
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

AppDataSource.initialize()
  .then(() => {
    console.log("MySql Connected!");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during MySql Connection", err);
  });
