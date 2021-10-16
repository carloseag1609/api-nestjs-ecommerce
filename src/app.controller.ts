import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/hello/:name')
  getHelloWithName(@Param('name') name: string) {
    return `Hello ${name}`;
  }
}
