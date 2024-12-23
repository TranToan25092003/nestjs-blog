import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BryptProvider } from 'src/auth/providers/brypt.provider';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class UserCreateProvider {
  constructor(
    /**
     * inject user repository
     */
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    /**
     * inject brypt service
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    /**
     * inject mail service
     */
    private readonly mailService: MailService,
  ) {}

  /**
   * create a new user
   */
  public async createUser(newUser: CreateUserDto): Promise<User> {
    // check user exist
    let existUser: User = undefined;

    try {
      existUser = await this.userRepo.findOne({
        where: {
          email: newUser.email,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException('Please try later something wrong', {
        description: 'Error connect to database',
      });
    }

    // handle exception duplicate email
    if (existUser) {
      throw new BadRequestException('Email already exist', {
        description: 'User already exist try another email',
      });
    }

    //create a new user
    try {
      let newUserData: User = this.userRepo.create({
        ...newUser,
        password: await this.hashingProvider.hashPassword(newUser.password),
      });
      newUserData = await this.userRepo.save(newUserData);

      await this.mailService.sendMailWellcome(newUserData);

      return newUserData;
    } catch (error) {
      throw new RequestTimeoutException('something wrong please try later', {
        description: 'can not connect to server',
      });
    }
  }
}
