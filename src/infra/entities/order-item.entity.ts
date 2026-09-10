import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IOrderItemEntity } from "./interfaces";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "./product.entity";

@Entity({ name: "order-items" })
export class OrderItemEntity implements IOrderItemEntity {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column({ type: "uuid", name: "order_id" })
  declare orderId: string;

  @Column({ type: "uuid", name: "product_id" })
  declare productId: string;

  @Column({ type: "decimal", precision: 10, scale: 8 })
  declare price: number;

  @Column({ type: "int" })
  declare quantity: number;

  @CreateDateColumn({ name: "created_at" })
  declare createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  declare updatedAt: Date;

  @ManyToOne((type) => ProductEntity, (product) => product.orderItems)
  @JoinColumn({ name: "product_id" })
  declare product: ProductEntity;

  @ManyToOne((type) => OrderEntity, (order) => order.items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "order_id" })
  declare order: OrderEntity;
}
