import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { CatalogEntity } from "./catalog.entity";
import { ICatalogPriceEntity } from "./interfaces";
import { ProductEntity } from "./product.entity";

@Entity({ name: "catalog_prices" })
export class CatalogPriceEntity implements ICatalogPriceEntity {
  @PrimaryColumn({ type: "uuid", name: "catalog_id" })
  declare catalogId: string;

  @PrimaryColumn({ type: "uuid", name: "product_id" })
  declare productId: string;

  @PrimaryColumn({ type: "varchar", length: 3, default: "USD" })
  declare currency: string;

  @Column({ type: "decimal", precision: 10, scale: 8 })
  declare price: number;

  @CreateDateColumn({ name: "created_at" })
  declare createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  declare updatedAt: Date;

  @ManyToOne(() => CatalogEntity)
  @JoinColumn({ name: "catalog_id" })
  declare catalog: CatalogEntity;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: "product_id" })
  declare product: ProductEntity;
}
