import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../constant/auth.constant';
import { AuthType } from '../enums/authType.enum';

/**
 * decorator
 */
export const Auth = (...authType: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authType);
