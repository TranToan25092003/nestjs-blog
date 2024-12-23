import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/singin.dto';
import { SigninProvider } from './signin.provider';
import { RefreshTokenProvider } from './refresh-token.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Injectable()
export class AuthService {
  /**
   * constructor
   */
  constructor(
    /**
     * inject userService
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    /**
     * inject signin provider
     */
    private readonly siginProvider: SigninProvider,

    /**
     * inject refresh token provider
     */
    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}

  /**
   * signin
   */
  public async signin(signinDto: SignInDto) {
    return await this.siginProvider.signin(signinDto);
  }

  /**
   * refresh token
   */
  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokenProvider.RefreshToken(refreshTokenDto);
  }
}
