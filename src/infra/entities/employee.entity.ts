import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IEmployeeEntity } from "./interfaces";

@Entity({ name: "employees" })
export class EmployeeEntity implements IEmployeeEntity {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column({ type: "uuid", name: "company_id" })
  declare companyId: string;

  @Column({ type: "varchar", length: 100 })
  declare name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  declare email: string;

  @Column({ type: "varchar", length: 255 })
  declare password: string;

  @CreateDateColumn({ name: "created_at" })
  declare createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  declare updatedAt: Date;
}
