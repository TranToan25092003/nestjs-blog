import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/authType.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constant/auth.constant';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  // default value
  private static readonly defaultAuthType = [AuthType.Bearer];

  // auth map
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard, // need authen
    [AuthType.None]: { canActivate: () => true }, // do not need authen
  };

  /**
   * constructor
   *
   * */
  constructor(
    /**
     * inject reflextor class
     */
    private readonly reflector: Reflector,

    /**
     * inject access token guard
     */
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //  get authType by reflector
    const authTypes =
      this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? AuthenticationGuard.defaultAuthType;

    // array of guards
    const guards = authTypes
      .map((type: string) => {
        return this.authTypeGuardMap[type];
      })
      .flat();

    // loop guards canActivate
    for (const element of guards) {
      const isActivate = await Promise.resolve(
        element.canActivate(context),
      ).catch((error) => {
        error: error;
      });

      if (isActivate) {
        return true;
      }
    }

    throw new UnauthorizedException('signin please');
  }
}
