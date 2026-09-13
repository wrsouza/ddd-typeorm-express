import {
  seedCatalog,
  seedCompany,
  seedDiscount,
  seedOrder,
  seedProduct,
} from "./infra/seeds";
import { companyRepository } from "./infra/seeds/instances";

export default async function seeds() {
  const companiesFound = await companyRepository.getAll();
  if (companiesFound.length) {
    console.log("companies found", companiesFound);
    return;
  }

  const catalogs = await seedCatalog(6);
  console.log("catalogs", catalogs);

  const companies = await seedCompany(6, catalogs);
  console.log("companies", companies);

  const products = await seedProduct(6, catalogs);

  const discounts = await seedDiscount(10, companies, products);

  const orders = await seedOrder(10, companies, products, discounts);
}
