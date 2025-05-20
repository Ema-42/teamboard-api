import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/users/interfaces/user-token';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
