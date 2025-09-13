import * as ProductService from "../services/ProductService";
import { ProductCategory } from "../../entities/Product";
import type { NextFunction, Request, Response } from "express";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const listProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.query.category as ProductCategory;
    const products = await ProductService.getAllProducts(category);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await ProductService.getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { stock_quantity } = req.body;
    const product = await ProductService.updateProductStock(id, stock_quantity);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
