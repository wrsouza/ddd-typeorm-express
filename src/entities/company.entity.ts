import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderEntity } from "./order.entity";

export interface ICompanyEntity {
  id: string;
  name: string;
}

@Entity({ name: "companies" })
export class CompanyEntity {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column({ type: "varchar", length: 100 })
  declare name: string;

  @OneToMany((type) => OrderEntity, (order) => order.company)
  declare orders: OrderEntity[];

  @CreateDateColumn({ name: "created_at" })
  declare createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  declare updatedAt: Date;
}
