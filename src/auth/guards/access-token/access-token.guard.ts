import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { USER_REQUEST_KEY } from 'src/auth/constant/auth.constant';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  /**
   * constructor
   */
  constructor(
    /**
     * inject jwtService
     */
    private readonly jwtService: JwtService,

    /**
     * inject jwt config
     */
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract request from execution context
    const request = context.switchToHttp().getRequest();

    // Extract token from header
    const token: string | undefined = this.extractRequestFromHeader(request);

    // token does not exist
    if (!token) {
      throw new UnauthorizedException('signin first');
    }

    // Validate token
    try {
      //decode JWT token
      const payload = await this.jwtService.verifyAsync(token, {
        // config for JWT

        secret: this.configService.get('jwt.secret'),
        issuer: this.configService.get('jwt.issuer'),
        audience: this.configService.get('jwt.audience'),
      });

      // add data to request
      request[USER_REQUEST_KEY] = payload;
    } catch (error) {
      throw new UnauthorizedException('Sigin first');
    }

    return true;
  }

  /**
   * function get token from header
   */
  private extractRequestFromHeader(req: Request): string | undefined {
    const [_, token] = req.headers.authorization?.split(' ') ?? [];

    return token;
  }
}
