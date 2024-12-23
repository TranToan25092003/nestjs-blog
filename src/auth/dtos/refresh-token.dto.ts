import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'enter a refresh token here',
    example: 'some token ...',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
