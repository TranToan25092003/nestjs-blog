import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { postType } from '../enums/postType.enum';
import { statusType } from '../enums/statusType.enum';
import { MetaOptionDto } from '../../meta-options/dtos/post-metaOption.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'this is title and length between 5 and 100',
    example: 'Toan dep dai',
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  title: string;

  @ApiProperty({
    description: 'enter description',
    example: 'description 1',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;

  @ApiProperty({
    enum: postType,
    description: 'add a valid value post, page and so on',
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: 'a slug look like abc-def-vcl',
    example: 'toan-dep-dai',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Matches(/^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/, {
    message: 'slug does not match',
  })
  slug: string;

  @ApiProperty({
    enum: statusType,
    description: 'add valid status in enum',
  })
  @IsEnum(statusType)
  @IsNotEmpty()
  status: statusType;

  @ApiPropertyOptional({
    description: 'this is content',
    example: 'the content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: 'this is schema',
    example:
      '{\r\n    "@context": "https://schema.org",\r\n    "@type": "Person"\r\n  }',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'img URL',
    example: 'http://localhost.com/images/image1.jpg',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featureImgUrl?: string;

  @ApiPropertyOptional({
    description: 'The date on which the blog post is published',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsDate()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'list of id tags',
    example: [1, 2],
  })
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    type: 'object',
    required: false,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'value is json',
          example: '{"sidebar": true}',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true }) // validate nested dto
  @Type(() => MetaOptionDto) // choose type dto you want to match
  metaOptions?: MetaOptionDto | null;
}
