import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Supplier } from "./Supplier";

export enum ProductCategory {
  ELECTRONICS = "ELECTRONICS",
  FASHION = "FASHION",
  HOME = "HOME",
  OTHER = "OTHER",
}

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  supplier_id: number;

  @Column({ length: 100 })
  title: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    transformer: { from: (value) => parseFloat(value), to: (value) => value },
  })
  price: number;

  @Column({ type: "int" })
  stock_quantity: number;

  @Column({
    type: "enum",
    enum: ProductCategory,
    default: ProductCategory.OTHER,
  })
  category: ProductCategory;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  @JoinColumn({ name: "supplier_id" })
  supplier: Supplier;
}
