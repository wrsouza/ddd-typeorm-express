import { Module } from "../../core";
import { HealthController } from "../controllers/health.controller";

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
