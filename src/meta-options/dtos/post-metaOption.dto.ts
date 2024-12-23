import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class MetaOptionDto {
  @ApiProperty({
    description: 'metaValue must be an json',
    example:
      '{\r\n    "@context": "https://schema.org",\r\n    "@type": "Person"\r\n  }',
  })
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
