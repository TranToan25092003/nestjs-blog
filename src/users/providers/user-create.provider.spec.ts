import { Test, TestingModule } from '@nestjs/testing';
import { UserCreateProvider } from './user-create.provider';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { BadRequestException } from '@nestjs/common';

/**
 * mocking repository
 */
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('userCreateProvider', () => {
  // create user provider
  let provider: UserCreateProvider;

  //   user repositoyry
  let userRepository: MockRepository;

  //   mock user
  const user: CreateUserDto = {
    firstName: 'toan',
    lastName: 'tran',
    email: '123@gmail.com',
    password: '123213kjkjlkj',
  };

  //   before test
  beforeEach(async () => {
    //  instanciate module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCreateProvider,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
        {
          provide: HashingProvider,
          useValue: { hashPassword: jest.fn(() => user.password) },
        },
        {
          provide: MailService,
          useValue: {
            sendMailWellcome: jest.fn(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    //  reassign user provider
    provider = module.get<UserCreateProvider>(UserCreateProvider);

    // reassign user repository
    userRepository = module.get(getRepositoryToken(User));
  });

  //   checkt service is instanciated
  it('should be define', () => {
    expect(provider).toBeDefined();
  });

  // test create user method when user does not exist
  describe('user does not exist in db', () => {
    it('should create user success', async () => {
      userRepository.findOne.mockReturnValue(null); // set data will return in this method
      userRepository.create.mockReturnValue(user); // same above
      userRepository.save.mockReturnValue(user); // same above

      const newUser = await provider.createUser(user);

      //   test whether the findone method will be call with this input
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: {
          email: user.email,
        },
      });

      //  test whether the create method will be call with this input
      expect(userRepository.create).toHaveBeenCalledWith(user);

      //  test whether the save method will be call with this input
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });
  });

  //   test create user method when user already exist
  describe('user exist in db', () => {
    it('throw bad request exception', async () => {
      userRepository.findOne.mockReturnValue(user.email); // set data will return in this method
      userRepository.create.mockReturnValue(user); // same above
      userRepository.save.mockReturnValue(user); // same above

      try {
        const newUser = await provider.createUser(user);
      } catch (error) {
        // check exception throw as expected
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
