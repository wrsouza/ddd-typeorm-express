import { Injectable } from "../../core";
import { IOrderItemEntity } from "../entities";
import { IOrderItemRepository } from "./interfaces";
import { Repository } from "./repository";

@Injectable()
export class OrderItemRepository
  extends Repository<IOrderItemEntity>
  implements IOrderItemRepository {}
