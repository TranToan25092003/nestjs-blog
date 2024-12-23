import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserByEmailProvider {
  /**
   * constructor
   */
  constructor(
    /**
     * inject user repository
     */
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  /**
   * find an user by email
   */
  public async getUserByEmail(email: string): Promise<User> {
    // get user
    let user: User | undefined = undefined;
    try {
      user = await this.userRepo.findOneBy({ email: email });
    } catch (error) {
      throw new RequestTimeoutException(
        error,
        'something wrong please try later',
      );
    }

    // not exist throw exception
    if (!user) {
      throw new UnauthorizedException(
        'email does not exist please try another',
      );
    }

    // exist return the user
    return user;
  }
}
