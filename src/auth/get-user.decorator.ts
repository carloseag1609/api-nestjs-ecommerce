import {
  createParamDecorator,
  ExecutionContext,
  Provider,
} from '@nestjs/common';
import { Client } from './modules/clients/entities/client.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Provider | Client => {
    const req = ctx.switchToHttp().getRequest();
    delete req.user.user.password;
    return req.user;
  },
);
