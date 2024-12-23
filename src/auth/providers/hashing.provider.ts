import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  /**
   * hash password
   */
  abstract hashPassword(password: string | Buffer): Promise<string>;

  /**
   * compare password
   */
  abstract comparedPassword(
    data: string | Buffer,
    encryped: string,
  ): Promise<boolean>;
}
