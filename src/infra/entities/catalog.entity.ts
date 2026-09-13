import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CompanyEntity } from "./company.entity";
import { ICatalogEntity } from "./interfaces";
import { ProductEntity } from "./product.entity";

@Entity({ name: "catalogs" })
export class CatalogEntity implements ICatalogEntity {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column({ type: "varchar", length: 100 })
  declare name: string;

  @CreateDateColumn({ name: "created_at" })
  declare createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  declare updatedAt: Date;

  @OneToMany(() => CompanyEntity, (company) => company.catalog)
  declare companies: CompanyEntity[];

  @OneToMany(() => ProductEntity, (product) => product.catalog, { eager: true })
  declare products: ProductEntity[];
}
