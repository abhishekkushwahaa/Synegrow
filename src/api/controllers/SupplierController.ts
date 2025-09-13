import type { NextFunction, Request, Response } from "express";
import * as SupplierService from "../services/SupplierService";

export const addSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const supplier = await SupplierService.createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    next(error);
  }
};

export const listSuppliers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const suppliers = await SupplierService.getAllSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    next(error);
  }
};

export const getSupplierDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const supplier = await SupplierService.getSupplierById(id);
    res.status(200).json(supplier);
  } catch (error) {
    next(error);
  }
};
