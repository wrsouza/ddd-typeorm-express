import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CatalogPriceEntity } from "./catalog-price.entity";
import { CompanyEntity } from "./company.entity";
import { ICatalogEntity } from "./interfaces";

@Entity({ name: "catalogs" })
export class CatalogEntity implements ICatalogEntity {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column({ type: "varchar", length: 100 })
  declare name: string;

  @Column({ type: "varchar", length: 3, default: "USD" })
  declare currency: string;

  @CreateDateColumn({ name: "created_at" })
  declare createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  declare updatedAt: Date;

  @OneToMany(() => CompanyEntity, (company) => company.catalog)
  declare companies: CompanyEntity[];

  @OneToMany(() => CatalogPriceEntity, (catalogPrice) => catalogPrice.catalog)
  declare products: CatalogPriceEntity[];
}
