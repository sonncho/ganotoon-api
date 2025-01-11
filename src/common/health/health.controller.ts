import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SWAGGER_API_TAG } from '../constants/swagger.constant';

@Controller('health')
@ApiTags(SWAGGER_API_TAG.HEALTH.name)
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: '서버 상태 체크' })
  check() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
