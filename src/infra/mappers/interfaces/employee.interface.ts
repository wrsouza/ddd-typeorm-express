import { IEmployee } from "../../../domain";
import { IEmployeeEntity } from "../../entities";

export interface IEmployeeMapper {
  toDomain(data: IEmployeeEntity): IEmployee;
}
