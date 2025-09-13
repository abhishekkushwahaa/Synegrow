import { AppDataSource } from "../../config/data-source";
import { Product, ProductCategory, Supplier } from "../../entities/Entities";
import { AppError } from "../../utils/Error";
import { ProductValidator } from "../../validation/Product";

const productRepo = AppDataSource.getRepository(Product);
const supplierRepo = AppDataSource.getRepository(Supplier);

export const createProduct = async (data: Partial<Product>) => {
  const validator = new ProductValidator();
  const errors = validator.validate(data);
  if (errors.length > 0) {
    throw new AppError("Validation failed", 400, errors);
  }

  const supplier = await supplierRepo.findOneBy({ id: data.supplier_id });
  if (!supplier) {
    throw new AppError("Supplier not found for the provided supplier_id", 404);
  }

  const newProduct = productRepo.create(data);
  return await productRepo.save(newProduct);
};

export const getAllProducts = async (category?: ProductCategory) => {
  const queryOptions = {
    relations: ["supplier"],
    where: {},
  };

  if (category && Object.values(ProductCategory).includes(category)) {
    queryOptions.where = { category };
  }

  return await productRepo.find(queryOptions);
};

export const getProductById = async (id: number) => {
  const product = await productRepo.findOne({
    where: { id },
    relations: ["supplier"],
  });
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return product;
};

export const updateProductStock = async (
  id: number,
  stock_quantity: number
) => {
  const validator = new ProductValidator();
  const errors = validator.validateStockUpdate({ stock_quantity });
  if (errors.length > 0) {
    throw new AppError("Validation failed", 400, errors);
  }

  const product = await productRepo.findOneBy({ id });
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  product.stock_quantity = stock_quantity;
  return await productRepo.save(product);
};
