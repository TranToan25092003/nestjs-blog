import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'email',
    example: 'toanvip123@gmail.aaacom',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'enter password',
    example: '123456aa',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
