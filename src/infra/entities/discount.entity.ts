import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CompanyEntity } from "./company.entity";
import { DiscountProgressiveValueEntity } from "./discount-progressive-value.entity";
import { IDiscountEntity } from "./interfaces/discount.interface";
import { ProductEntity } from "./product.entity";

@Entity({ name: "discounts" })
export class DiscountEntity implements IDiscountEntity {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column({ type: "varchar", length: 255 })
  declare name: string;

  @Column({ type: "varchar", length: 50 })
  declare type: string;

  @Column({ type: "int", nullable: true })
  declare minimumQuantity: number | null;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  declare percentage: number | null;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  declare value: number | null;

  @CreateDateColumn({ name: "created_at" })
  declare createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  declare updatedAt: Date;

  @ManyToMany(() => ProductEntity, {
    onDelete: "CASCADE",
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: "discount_product",
    joinColumn: {
      name: "discount_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "product_id",
      referencedColumnName: "id",
    },
  })
  declare products: ProductEntity[];

  @ManyToMany(() => CompanyEntity, {
    onDelete: "CASCADE",
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: "discount_company",
    joinColumn: {
      name: "discount_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "company_id",
      referencedColumnName: "id",
    },
  })
  declare companies: CompanyEntity[];

  @OneToMany(
    () => DiscountProgressiveValueEntity,
    (progressiveValue) => progressiveValue.discount,
    {
      onDelete: "CASCADE",
      eager: true,
      cascade: true,
    },
  )
  declare progressiveValues: DiscountProgressiveValueEntity[];
}
