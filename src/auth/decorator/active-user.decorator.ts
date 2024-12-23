import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserInterface } from '../interfaces/Active-User-data.interface';
import { USER_REQUEST_KEY } from '../constant/auth.constant';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserInterface | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest(); // get request from Execution context

    const user: ActiveUserInterface = request[USER_REQUEST_KEY]; // get all user information

    return field ? user?.[field] : user; // return data depend on Decorator
  },
);
