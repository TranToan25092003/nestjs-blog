import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { User } from 'src/users/user.entity';
import { SignInDto } from '../dtos/singin.dto';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ActiveUserInterface } from '../interfaces/Active-User-data.interface';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class SigninProvider {
  /**
   * constructor
   */
  constructor(
    /**
     * inject user service
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    /**
     * inject hashing provider
     */
    private readonly hashingProvider: HashingProvider,

    /**
     * inject JWT service
     */
    private readonly jwtService: JwtService,

    /**
     * inject JWT config
     */
    private readonly configService: ConfigService,

    /**
     * inject generate token provider
     */
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  /**
   * signin method
   */
  public async signin(signinDto: SignInDto) {
    // check user exist by email
    let user: User = undefined;
    try {
      user = await this.userService.getUserByEmail(signinDto.email);
    } catch (error) {
      throw new RequestTimeoutException('somethingwrong', {
        cause: error,
      });
    }

    // check password
    let matchPassword: boolean = false;
    try {
      matchPassword = await this.hashingProvider.comparedPassword(
        signinDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(
        error,
        'something wrong please try again',
      );
    }

    // password correct
    if (!matchPassword) {
      throw new UnauthorizedException('Incorrect password');
    }

    // return JWT token

    return await this.generateTokenProvider.generateTokens(user);
  }
}

/**
 * add ttl for refresh token in env.development file
 *
 * add to jwt config file the new var
 *
 * validation the new var
 *
 * create a new provider contain function that sing token depend on ttl
 *
 * create a method inside above provider that generate jwt and refresh token in once time
 *
 * replace all old code with method in provider
 *
 * create refresh token provider
 *
 * create refresh token endpoint
 */
