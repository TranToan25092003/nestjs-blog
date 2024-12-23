import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UserCreateManyProvider {
  /**
   * constructor
   */
  constructor(
    /**
     * inject data source
     */
    private readonly dataSource: DataSource,
  ) {}

  /**
   * create many user
   */

  public async createMultip(createUSersDto: CreateManyUsersDto) {
    let users: User[] = [];

    // create query runner
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // connect to db sourse
      await queryRunner.connect();

      // start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Something wrong try later');
    }

    try {
      for (const user of createUSersDto.users) {
        const newUser: User = queryRunner.manager.create(User, user);
        const result: User = await queryRunner.manager.save(newUser);
        users.push(result);
      }

      // commit if success
      await queryRunner.commitTransaction();
    } catch (error) {
      // rollback if failed
      await queryRunner.rollbackTransaction();
      throw new ConflictException('email aready exist', {
        description: String(error),
      });
    } finally {
      try {
        // release
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release', {
          description: String(error),
        });
      }
    }

    return users;
  }
}
