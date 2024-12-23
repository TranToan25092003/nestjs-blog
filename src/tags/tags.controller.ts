import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dtos/create-tag.dto';
import { Tag } from './tag.entity';

@Controller('tags')
@ApiTags('Tags')
export class TagsController {
  /**
   * constructor
   */
  constructor(
    /**
     * inject tag service
     */
    private readonly tagService: TagsService,
  ) {}

  /**
   * create new tag
   * # [POST] /tags/create
   */
  @ApiOperation({
    summary: 'create a new tag',
  })
  @ApiResponse({
    status: 201,
    description: 'create tag success',
  })
  @Post('/create')
  public createTag(@Body() newTag: CreateTagDto): Promise<Tag> {
    return this.tagService.createTag(newTag);
  }

  /**
   * delete a tag
   * # [DELETE] /tags/delete
   */
  @ApiOperation({
    summary: 'delete a tag',
  })
  @ApiResponse({
    status: 200,
    description: 'delete a tag successfully when code = 200',
  })
  @Delete('/delete')
  public deleteTag(@Query('id', ParseIntPipe) idTag: number) {
    return this.tagService.deleteTag(idTag);
  }

  /**
   * soft delete
   * #[DELETE] /tags/soft-delete
   */
  @ApiOperation({
    summary: 'soft delete tag',
  })
  @ApiResponse({
    status: 200,
    description: 'delete soft success',
  })
  @Delete('/soft-delete')
  public softDelete(@Query('id', ParseIntPipe) idTag: number) {
    return this.tagService.softDeleteTag(idTag);
  }
}
