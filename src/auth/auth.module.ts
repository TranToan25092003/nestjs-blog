import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BryptProvider } from './providers/brypt.provider';
import { SigninProvider } from './providers/signin.provider';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import { GenerateTokenProvider } from './providers/generate-token.provider';
import { RefreshTokenProvider } from './providers/refresh-token.provider';
import { GoogleAuthenticationControllerController } from './social/google-authentication.controller.controller';
import { GoogleAuthenticationService } from './social/providers/google-authentication.service';

@Module({
  controllers: [AuthController, GoogleAuthenticationControllerController],
  providers: [
    AuthService,
    {
      provide: HashingProvider, // provider Cung cấp abstract class
      useClass: BryptProvider, // provider sử dụng lớp cụ thể
    },
    SigninProvider,
    GenerateTokenProvider,
    RefreshTokenProvider,
    GoogleAuthenticationService,
  ],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync(jwtConfig.asProvider()), // import jwt module and cofig
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
