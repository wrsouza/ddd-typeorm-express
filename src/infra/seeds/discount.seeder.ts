import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { database } from "../../config";
import {
  DiscountEntity,
  ICompanyEntity,
  IDiscountEntity,
  IProductEntity,
} from "../entities";

function makeFixedDiscount(
  companies: ICompanyEntity[],
  products: IProductEntity[],
): IDiscountEntity {
  return {
    id: uuid(),
    name: "$15% Desconto",
    type: "FIXED",
    minimumQuantity: 1,
    percentage: null,
    value: 15,
    companies,
    products,
    progressiveValues: [],
  };
}

function makePercentageDiscount(
  companies: ICompanyEntity[],
  products: IProductEntity[],
): IDiscountEntity {
  return {
    id: uuid(),
    name: "10% Desconto",
    type: "PERCENTAGE",
    minimumQuantity: 1,
    percentage: 10,
    value: null,
    companies,
    products,
    progressiveValues: [],
  };
}

function makeProgressiveDiscount(
  companies: ICompanyEntity[],
  products: IProductEntity[],
): IDiscountEntity {
  const id = uuid();
  return {
    id,
    name: "20% Progressive",
    type: "PROGRESSIVE",
    minimumQuantity: 1,
    percentage: null,
    value: null,
    companies,
    products,
    progressiveValues: [
      {
        minimumQuantity: 1,
        percentage: null,
        value: 5,
      },
      {
        minimumQuantity: 5,
        percentage: null,
        value: 10,
      },
      {
        minimumQuantity: 10,
        percentage: null,
        value: 20,
      },
    ],
  };
}

function makeDiscounts(
  length: number,
  companies: ICompanyEntity[],
  products: IProductEntity[],
): IDiscountEntity[] {
  const list: IDiscountEntity[] = [];
  list.push(
    makePercentageDiscount(
      [companies[0], companies[1]],
      [products[0], products[1]],
    ),
  );
  list.push(
    makeFixedDiscount([companies[2], companies[3]], [products[2], products[4]]),
  );
  list.push(
    makeProgressiveDiscount(
      [companies[4], companies[5]],
      [products[5], products[6]],
    ),
  );
  return list;
}

function getClient(): Repository<DiscountEntity> {
  return database.getRepository(DiscountEntity);
}

export async function seedDiscount(
  length: number,
  companies: ICompanyEntity[],
  products: IProductEntity[],
): Promise<IDiscountEntity[]> {
  const discounts = makeDiscounts(length, companies, products);
  return Promise.all(discounts.map((discount) => getClient().save(discount)));
}
