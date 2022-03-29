import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorator/public.decorator'

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@SetMetadata('isPublic', true)
  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
