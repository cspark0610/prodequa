import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentSession = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);

/*
{
  sub: '62f3a1f2c2ee7fd6963ee70b',
  email: 'test3@gmail.com',
  iat: 1660133945,
  exp: 1660220345
}
*/
