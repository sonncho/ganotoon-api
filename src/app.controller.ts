import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @Redirect('/health')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Root path redirect to health check' })
  root() {
    return;
  }
}
