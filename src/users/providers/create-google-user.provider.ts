import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleUserInterface } from '../interfaces/google-user.interface';

@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    /**
     * inject user repository
     */
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * create google user
   */
  public async createGoogleUser(createGoogleUser: GoogleUserInterface) {
    // create new google user
    try {
      let user = this.userRepo.create(createGoogleUser);

      user = await this.userRepo.save(user);

      return user;
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'something wrong could not create user',
      });
    }
  }
}
