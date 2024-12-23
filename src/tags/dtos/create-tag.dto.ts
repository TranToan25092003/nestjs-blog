import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'name tag',
    example: 'viral',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'a slug look like abc-def-vcl',
    example: 'toan-dep-dai',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(512)
  @Matches(/^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/, {
    message: 'slug does not match',
  })
  slug: string;

  @ApiPropertyOptional({
    description: 'enter description',
    example: 'description 1',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'enter schema',
    example:
      '{\r\n    "@context": "https://schema.org",\r\n    "@type": "Person"\r\n  }',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'img url',
    example: 'http://localhost.com/images/image1.jpg',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImgUrl?: string;
}
