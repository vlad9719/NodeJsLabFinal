import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/healthcheck')
export class HealthcheckController {

  @Get()
  @UseGuards(AuthGuard('jwt'))
  healthCheck(): object {
    return {
      message: 'Server is running',
    };
  }

}
