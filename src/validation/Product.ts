import { ProductCategory } from "../entities/Product";
import type { ValidationError } from "./Supplier";

export class ProductValidator {
  public errors: ValidationError[] = [];

  private addError(field: string, message: string) {
    this.errors.push({ field, message });
  }

  public validate(data: any): ValidationError[] {
    this.errors = [];

    if (!data.title || data.title.trim() === "" || data.title.length > 100) {
      this.addError(
        "title",
        "Title is required and must be 100 characters or less."
      );
    }

    if (
      data.price === undefined ||
      isNaN(parseFloat(data.price)) ||
      parseFloat(data.price) <= 0
    ) {
      this.addError("price", "Price must be a number greater than 0.");
    }

    if (
      data.stock_quantity === undefined ||
      !Number.isInteger(data.stock_quantity) ||
      data.stock_quantity < 0
    ) {
      this.addError(
        "stock_quantity",
        "Stock quantity must be an integer of 0 or greater."
      );
    }

    if (
      !data.category ||
      !Object.values(ProductCategory).includes(data.category)
    ) {
      this.addError(
        "category",
        `Category must be one of: ${Object.values(ProductCategory).join(", ")}.`
      );
    }

    if (data.supplier_id === undefined || !Number.isInteger(data.supplier_id)) {
      this.addError("supplier_id", "A valid supplier_id is required.");
    }

    return this.errors;
  }

  public validateStockUpdate(data: any): ValidationError[] {
    this.errors = [];
    if (
      data.stock_quantity === undefined ||
      !Number.isInteger(data.stock_quantity) ||
      data.stock_quantity < 0
    ) {
      this.addError(
        "stock_quantity",
        "Stock quantity must be an integer of 0 or greater."
      );
    }
    return this.errors;
  }
}
