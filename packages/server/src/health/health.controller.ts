import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';

@Controller('Healths')
export class HealthController {
  constructor(private health: HealthCheckService, private http: HttpHealthIndicator) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'health check'
  })
  @HealthCheck()
  check() {
    return this.health.check([() => this.http.pingCheck('animalgram-docs', 'http://localhost:4000/api')]);
  }
}
