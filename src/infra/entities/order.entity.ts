import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CompanyEntity } from "./company.entity";
import { IOrderEntity } from "./interfaces";
import { OrderItemEntity } from "./order-item.entity";

@Entity({ name: "orders" })
export class OrderEntity implements IOrderEntity {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column({ type: "varchar", length: 100 })
  declare name: string;

  @Column({ type: "uuid", name: "company_id" })
  declare companyId: string;

  @CreateDateColumn({ name: "created_at" })
  declare createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  declare updatedAt: Date;

  @ManyToOne((type) => CompanyEntity, (company) => company.orders)
  @JoinColumn({ name: "company_id" })
  declare company: CompanyEntity;

  @OneToMany((type) => OrderItemEntity, (item) => item.order, {
    eager: true,
    cascade: true,
  })
  declare items: OrderItemEntity[];
}
