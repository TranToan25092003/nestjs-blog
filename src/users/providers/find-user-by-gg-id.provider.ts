import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindUserByGgIdProvider {
  /**
   * constructor
   */
  constructor(
    /**
     * inject repository of User
     */
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * method get user by google id
   */
  public async findUserByGGid(googleId: string): Promise<User> {
    try {
      return await this.userRepo.findOneBy({ googleId: googleId });
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }
}
