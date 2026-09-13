import { Injectable } from "../../core";
import { IOrderEntity } from "../entities";
import { IOrderRepository } from "./interfaces";
import { Repository } from "./repository";

@Injectable()
export class OrderRepository
  extends Repository<IOrderEntity>
  implements IOrderRepository {}
