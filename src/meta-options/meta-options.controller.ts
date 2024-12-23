import { Body, Controller, Inject, Post } from '@nestjs/common';
import { MetaOptionService } from './providers/meta-option.service';
import { MetaOptionDto } from './dtos/post-metaOption.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MetaOption } from './meta-option.entity';

@Controller('meta-options')
@ApiTags('meta-option')
export class MetaOptionsController {
  /**
   *
   * contructor
   */
  constructor(
    /**
     * inject meta service
     */
    private readonly metaOptionService: MetaOptionService,
  ) {}

  /**
   * create meta option
   * [POST]
   */
  @ApiOperation({
    summary: 'create a new meta option',
  })
  @ApiResponse({
    status: 201,
    description: 'create new meta option success',
  })
  @Post('create')
  public createMetaOption(
    @Body() newMetaOption: MetaOptionDto,
  ): Promise<MetaOption> {
    return this.metaOptionService.createMetaOption(newMetaOption);
  }
}
