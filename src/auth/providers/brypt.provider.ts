import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
/**
 * brypt class
 */
export class BryptProvider implements HashingProvider {
  /**
   * hash password funciton
   */
  async hashPassword(password: string | Buffer): Promise<string> {
    // salt
    const salt: string = await bcrypt.genSalt();

    // hashing
    return await bcrypt.hash(password, salt);
  }

  /**
   * compare password function
   */
  async comparedPassword(
    passwordEnter: string | Buffer,
    encrypedPassword: string,
  ): Promise<boolean> {
    // compared password
    return await bcrypt.compare(passwordEnter, encrypedPassword);
  }
}
