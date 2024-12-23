import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/users/providers/users.service';
import { User } from 'src/users/user.entity';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class RefreshTokenProvider {
  /**
   * constructor
   */
  constructor(
    /**
     * jwt service
     */
    private readonly jwtService: JwtService,

    /**
     *  jwt config
     */
    private readonly configService: ConfigService,

    /**
     * inject user service
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    /**
     * generate token provider
     */
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  /**
   * gennerate new access token based on refresh token
   */
  public async RefreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      // get user id by jwt service and jwtconfig
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.configService.get('jwt.secret'),
          issuer: this.configService.get('jwt.issuer'),
          audience: this.configService.get('jwt.audience'),
        },
      );

      // fetch user from db
      const user: User = await this.userService.findOne(sub);

      // regenerate access token
      return await this.generateTokenProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
