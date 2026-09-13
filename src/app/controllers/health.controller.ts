import { Controller, Get } from "../../core";

@Controller("health")
export class HealthController {
  @Get()
  checkHealth() {
    return { message: "Ok" };
  }
}
