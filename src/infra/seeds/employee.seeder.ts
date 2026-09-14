import { faker } from "@faker-js/faker";
import { hashSync } from "bcrypt";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { database } from "../../config";
import { ICompanyEntity, IEmployeeEntity } from "../entities";
import { EmployeeEntity } from "../entities/employee.entity";

function makeEmployee(companies: ICompanyEntity[]): IEmployeeEntity[] {
  const list: IEmployeeEntity[] = [];
  for (const company of companies) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    list.push({
      id: uuid(),
      companyId: company.id,
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: hashSync("123456", 8),
    });
  }
  return list;
}

function getClient(): Repository<EmployeeEntity> {
  return database.getRepository(EmployeeEntity);
}

export async function seedEmployee(
  companies: ICompanyEntity[],
): Promise<IEmployeeEntity[]> {
  const employees = makeEmployee(companies);
  return Promise.all(employees.map((employee) => getClient().save(employee)));
}
