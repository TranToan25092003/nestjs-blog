import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { FindUserByGgIdProvider } from './find-user-by-gg-id.provider';
import { FindUserByEmailProvider } from './find-user-by-email.provider';
import { UserCreateProvider } from './user-create.provider';
import { UserCreateManyProvider } from './user-create-many.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UserController', () => {
  // user service variable
  let service: UserService;

  //   before test
  beforeEach(async () => {
    // mock user provider method userCreate
    /**
     * mocking provider
     */
    const mockCreateUserProvider: Partial<UserCreateProvider> = {
      createUser: (createUserDto: CreateUserDto) =>
        Promise.resolve({
          id: 1111,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
        }),
    };

    //  instanciate module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserCreateProvider,
          useValue: mockCreateUserProvider,
        },
        {
          // add data source MOCK
          provide: DataSource,
          useValue: {},
        },
        {
          // inject user repository MOCK
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          // MOCK
          provide: CreateGoogleUserProvider,
          useValue: {},
        },
        {
          provide: FindUserByGgIdProvider,
          useValue: {},
        },
        {
          provide: FindUserByEmailProvider,
          useValue: {},
        },

        {
          provide: UserCreateManyProvider,
          useValue: {},
        },
      ],
    }).compile();

    //  get User service and reassign it
    service = module.get<UserService>(UserService);
  });

  //   checkt service is instanciated
  it('should be define', () => {
    expect(service).toBeDefined();
  });

  //  check create user is call and define
  describe('createUser', () => {
    // define
    it('should be define method create user', () => {
      expect(service.createUser).toBeDefined();
    });

    // call
    it('should be call method create user', async () => {
      const user = await service.createUser({
        firstName: 'toan dep dai',
        lastName: 'heheheh',
        email: 'toan@gmail.com',
        password: '12323jdsjaksjd',
      });

      expect(user.firstName).toEqual('toan dep dai');
    });
  });
});
