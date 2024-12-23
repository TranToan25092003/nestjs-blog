import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManyUsersDto {
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'User',
    },
  })
  @ArrayNotEmpty()
  @IsArray()
  @Type(() => CreateUserDto)
  @ValidateNested({ each: true })
  users: CreateUserDto[];
}
