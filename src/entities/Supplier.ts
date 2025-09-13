import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Product } from "./Product";

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
