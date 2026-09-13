import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DiscountEntity } from "./discount.entity";
import { IDiscountProgressiveValueEntity } from "./interfaces/discount-progressive-value.interface";

@Entity({ name: "progressive_discounts" })
export class DiscountProgressiveValueEntity implements IDiscountProgressiveValueEntity {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column({ type: "uuid", name: "discount_id" })
  declare discountId: string;

  @Column({ type: "int" })
  declare minimumQuantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  declare value: number | null;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  declare percentage: number | null;

  @CreateDateColumn({ name: "created_at" })
  declare createdAt: Date;

  @ManyToOne((type) => DiscountEntity, (discount) => discount.progressiveValues)
  @JoinColumn({ name: "discount_id" })
  declare discount: DiscountEntity;
}
