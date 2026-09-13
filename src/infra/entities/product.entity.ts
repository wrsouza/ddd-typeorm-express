import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CatalogPriceEntity } from "./catalog-price.entity";
import { DiscountEntity } from "./discount.entity";
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

  @Column({ type: "varchar", length: 100 })
  declare category: string;

  @CreateDateColumn({ name: "created_at" })
  declare createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  declare updatedAt: Date;

  @OneToMany(() => CatalogPriceEntity, (catalogPrice) => catalogPrice.product, {
    eager: true,
    cascade: true,
  })
  declare prices: CatalogPriceEntity[];

  @ManyToMany(() => DiscountEntity)
  declare discounts: DiscountEntity[];

  @OneToMany((type) => OrderItemEntity, (orderItem) => orderItem.product)
  declare orderItems: OrderItemEntity[];
}
