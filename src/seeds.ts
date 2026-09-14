import {
  getAllCompanies,
  seedCatalog,
  seedCompany,
  seedDiscount,
  seedEmployee,
  seedOrder,
  seedProduct,
} from "./infra/seeds";

export default async function seeds() {
  const companiesFound = await getAllCompanies();
  if (companiesFound.length) {
    console.log("companies found", companiesFound);
    return;
  }

  const catalogs = await seedCatalog(6);

  const companies = await seedCompany(6, catalogs);

  const employees = await seedEmployee(companies);
  console.log("employees", employees);

  const products = await seedProduct(30, catalogs);

  const discounts = await seedDiscount(10, companies, products);

  const orders = await seedOrder(10, companies, products, discounts);
}
