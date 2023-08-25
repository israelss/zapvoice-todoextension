import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUser as ICurrentUser } from './current-user.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof ICurrentUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ICurrentUser = request.user;

    return data ? user?.[data] : user;
  },
);
