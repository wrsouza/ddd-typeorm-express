export interface IEmployeeData {
  id: string;
  companyId: string;
  name: string;
  email: string;
}

export interface IEmployeeJson extends IEmployeeData {}

export interface IEmployee {
  getId(): string;
  getCompanyId(): string;
  getName(): string;
  getEmail(): string;
  toJson(): IEmployeeJson;
}
