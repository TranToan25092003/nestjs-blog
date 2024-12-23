import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { ActiveUserInterface } from '../interfaces/Active-User-data.interface';

@Injectable()
export class GenerateTokenProvider {
  /**
   * constructor
   */
  constructor(
    /**
     * inject jwt service
     */
    private readonly jwtService: JwtService,

    /**
     * inject config service
     */
    private readonly configService: ConfigService,
  ) {}

  /**
   * generate a token
   */
  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    // return JWT token
    const jwtToken: string = await this.jwtService.signAsync(
      {
        // Payload what we want to send
        sub: userId,
        ...payload,
      },
      {
        // config for JWT
        secret: this.configService.get('jwt.secret'),
        issuer: this.configService.get('jwt.issuer'),
        audience: this.configService.get('jwt.audience'),
        expiresIn: expiresIn,
      },
    );

    return jwtToken;
  }

  /**
   * generate access token and refresh token
   */
  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      // generate access token

      await this.signToken<Partial<ActiveUserInterface>>(
        user.id,
        this.configService.get('jwt.TTL'),
        {
          email: user.email,
        },
      ),

      // generate refresh token

      await this.signToken(user.id, this.configService.get('jwt.refreshTTL')),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
