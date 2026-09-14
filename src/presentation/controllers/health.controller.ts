import { Controller, Get } from "../../core";
import { ApiOperation, ApiResponse, ApiTags } from "../decorators";
import { healthResultSchema } from "../swagger";

@ApiTags("Health")
@Controller("health")
export class HealthController {
  @Get()
  @ApiOperation({ summary: "Check API health" })
  @ApiResponse({
    status: 200,
    description: "Service is up",
    schema: healthResultSchema,
  })
  checkHealth() {
    return { message: "Ok" };
  }
}
