import { AppDataSource } from "../../config/data-source";
import { Supplier } from "../../entities/Entities";
import { AppError } from "../../utils/Error";
import { SupplierValidator } from "../../validation/Supplier";

const supplierRepo = AppDataSource.getRepository(Supplier);

export const createSupplier = async (data: Partial<Supplier>) => {
  const validator = new SupplierValidator();
  const errors = validator.validate(data);
  if (errors.length > 0) {
    throw new AppError("Validation failed", 400, errors);
  }

  const existingSupplier = await supplierRepo.findOneBy({ email: data.email });
  if (existingSupplier) {
    throw new AppError("A supplier with this email already exists", 400);
  }

  const newSupplier = supplierRepo.create(data);
  return await supplierRepo.save(newSupplier);
};

export const getAllSuppliers = async () => {
  return await supplierRepo.find();
};

export const getSupplierById = async (id: number) => {
  const supplier = await supplierRepo.findOne({
    where: { id },
    relations: ["products"],
  });

  if (!supplier) {
    throw new AppError("Supplier not found", 404);
  }

  const totalProducts = supplier.products.length;
  const totalStock = supplier.products.reduce(
    (acc, product) => acc + product.stock_quantity,
    0
  );

  return {
    ...supplier,
    analytics: {
      totalProducts,
      totalStockValue: totalStock,
    },
  };
};
