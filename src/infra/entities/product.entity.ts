import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IProductEntity } from "./interfaces";
import { OrderItemEntity } from "./order-item.entity";

@Entity({ name: "products" })
export class ProductEntity implements IProductEntity {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column({ type: "varchar", length: 50 })
  declare sku: string;

  @Column({ type: "varchar", length: 255 })
  declare name: string;

  @Column({ type: "decimal", precision: 10, scale: 8 })
  declare price: number;

  @Column({ type: "varchar", length: 100 })
  declare category: string;

  @CreateDateColumn({ name: "created_at" })
  declare createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  declare updatedAt: Date;

  @OneToMany((type) => OrderItemEntity, (orderItem) => orderItem.product)
  declare orderItems: OrderItemEntity[];
}
