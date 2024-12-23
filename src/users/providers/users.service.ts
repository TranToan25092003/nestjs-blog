import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUserParamDto } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UserCreateManyProvider } from './user-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { UserCreateProvider } from './user-create.provider';
import { FindUserByEmailProvider } from './find-user-by-email.provider';
import { FindUserByGgIdProvider } from './find-user-by-gg-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUserInterface } from '../interfaces/google-user.interface';

/**
 * user service contain methods relate to user
 */
@Injectable()
export class UserService {
  /**
   * contructor inject AuthService dependency
   */
  constructor(
    /**
     * inject auth service
    //  */
    // @Inject(forwardRef(() => AuthService))
    // private readonly authService: AuthService,

    /**
     * inject repository user
     */
    @InjectRepository(User) private readonly userRepo: Repository<User>,

    /**
     *
     */
    // @Inject(profileConfig.KEY)
    // private readonly configProfile: ConfigType<typeof profileConfig>,
    /**
     * inject userCreateManyProvider
     */
    private readonly userCreatManyProvider: UserCreateManyProvider,
    /**
     * inject user create provider
     */
    private readonly userCreate: UserCreateProvider,
    /**
     * inject find user by email provider
     */
    private readonly findUserByEmailProvider: FindUserByEmailProvider,
    // private readonly configService: ConfigService,

    /**
     * inject find user by google id provider
     */
    private readonly findUserByGGid: FindUserByGgIdProvider,

    /**
     * inject create google user provider
     */
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  /**
   * create a new user
   */
  public async createUser(newUser: CreateUserDto): Promise<User> {
    return await this.userCreate.createUser(newUser);
  }

  /**
   * get all user
   */
  public findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ) {
    // console.log(this.configService.get('database.host'));
    throw new HttpException(
      {
        status: HttpStatus.METHOD_NOT_ALLOWED,
        error: 'API does not exist',
        fileName: 'users.service.ts',
        line: 93,
      },
      HttpStatus.METHOD_NOT_ALLOWED,
      {
        description: 'Api is not exist',
      },
    );
  }

  /**
   * find one user by id
   */
  public async findOne(id: number): Promise<User> {
    let theUser: User = undefined;
    try {
      theUser = await this.userRepo.findOneBy({ id: id });
    } catch (error) {
      throw new RequestTimeoutException('something wrong please try later', {
        description: 'can not connect to server',
      });
    }

    if (!theUser) {
      throw new BadRequestException('Your request is invalid', {
        description: 'id is not exist',
      });
    }
    return theUser;
  }

  /**
   * create many user
   */
  public async createMultip(
    createUSersDto: CreateManyUsersDto,
  ): Promise<User[]> {
    return await this.userCreatManyProvider.createMultip(createUSersDto);
  }

  /**
   * get a user by email
   */
  public async getUserByEmail(email: string): Promise<User> {
    return await this.findUserByEmailProvider.getUserByEmail(email);
  }

  /**
   *  get a user by google id
   */
  public async getUserByGGId(googleId: string) {
    return await this.findUserByGGid.findUserByGGid(googleId);
  }

  /**
   * create google user
   */
  public async createGoogleUser(googleUser: GoogleUserInterface) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
