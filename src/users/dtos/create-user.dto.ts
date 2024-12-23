import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'enter the first name',
    example: 'toan dep dai',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 96)
  firstName: string;

  @ApiPropertyOptional({
    description: 'Enter last name',
    example: 'toan big duck',
  })
  @IsString()
  @Length(3, 100)
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: 'email',
    example: 'toan@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(8, 96)
  email: string;

  @ApiProperty({
    description: 'password',
    example: '123456a',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 96)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/, {
    message: 'password has at least one character and one number',
  })
  password: string;
}
