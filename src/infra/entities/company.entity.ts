import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CatalogEntity } from "./catalog.entity";
import { DiscountEntity } from "./discount.entity";
import { ICompanyEntity } from "./interfaces";
import { OrderEntity } from "./order.entity";

@Entity({ name: "companies" })
export class CompanyEntity implements ICompanyEntity {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column({ type: "varchar", length: 200 })
  declare name: string;

  @Column({ type: "uuid", name: "catalog_id", nullable: true })
  declare catalogId: string | null;

  @CreateDateColumn({ name: "created_at" })
  declare createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  declare updatedAt: Date;

  @OneToMany((type) => OrderEntity, (order) => order.company)
  declare orders: OrderEntity[];

  @ManyToMany(() => DiscountEntity)
  declare discounts: DiscountEntity[];

  @ManyToOne(() => CatalogEntity)
  @JoinColumn({ name: "catalog_id" })
  declare catalog: CatalogEntity;
}
