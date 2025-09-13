import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

// Define Enum here as well
export enum ProductCategory {
  ELECTRONICS = "ELECTRONICS",
  FASHION = "FASHION",
  HOME = "HOME",
  OTHER = "OTHER",
}

//++++++++++++++++++++++++++++++++++++
// SUPPLIER ENTITY
//++++++++++++++++++++++++++++++++++++
@Entity({ name: "suppliers" })
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 10 })
  phone: string;

  @Column()
  country: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];
}

//++++++++++++++++++++++++++++++++++++
// PRODUCT ENTITY
//++++++++++++++++++++++++++++++++++++
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

  @ManyToOne(() => Supplier, (supplier) => supplier.products, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "supplier_id" })
  supplier: Supplier;
}
