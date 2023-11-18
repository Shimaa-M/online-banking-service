import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('healthcheck')
@ApiTags('healthcheck')
export class HealthcheckController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator, // Use TypeOrmHealthIndicator instead of MongooseHealthIndicator
  ) {}

  @Get()
  @ApiOperation({ summary: 'Check the health of the application.' })
  async check() {
    return this.health.check([
      async () => this.db.pingCheck('database', { timeout: 300 }), // Adjust the timeout as needed
    ]);
  }
}
