import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserCreateManyProvider } from './providers/user-create-many.provider';
import { UserCreateProvider } from './providers/user-create.provider';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';
import { FindUserByGgIdProvider } from './providers/find-user-by-gg-id.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';
import profileConfig from './config/profile.config';

@Module({
  controllers: [UsersController],
  providers: [
    UserService,
    UserCreateManyProvider,
    UserCreateProvider,
    FindUserByEmailProvider,
    FindUserByGgIdProvider,
    CreateGoogleUserProvider,
  ],
  exports: [UserService],
  imports: [
    forwardRef(() => AuthModule), // service
    TypeOrmModule.forFeature([User]), // db
    ConfigModule.forFeature(profileConfig), // config
    // JwtModule.registerAsync(jwtConfig.asProvider()), //jwt service
  ],
})
export class UsersModule {}
