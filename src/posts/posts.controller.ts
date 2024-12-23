import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostDto } from './dtos/get-post.dto';
import { USER_REQUEST_KEY } from 'src/auth/constant/auth.constant';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserInterface } from 'src/auth/interfaces/Active-User-data.interface';

@Controller('posts')
@ApiTags('Posts') // set up group API name in swagger
export class PostsController {
  /**
   *contructor
   */
  constructor(
    /**
     *  inject post service
     */
    private readonly postsService: PostsService,
  ) {}

  /**
   * # [GET] /posts/:userId
   */

  @ApiOperation({
    summary: 'get all post by author id',
  })
  @ApiResponse({
    status: 200,
    description: 'get all post success',
  })
  @ApiParam({
    name: 'userId',
    type: 'number',
    description: 'author id',
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'number entity in a page',
    example: '2',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'page number',
    example: '1',
  })
  @Get('/:userId?')
  public getPosts(
    @Param('userId') userId: number,
    @Query() postQuery: GetPostDto,
  ) {
    return this.postsService.getAllPostByUserId(userId, postQuery);
  }

  /**
   * # [POST] /posts/create
   */
  @ApiOperation({
    summary: 'create a new post',
  })
  @ApiResponse({
    status: 201,
    description: 'create a new post successfull',
  })
  @Post('/create')
  public createPosts(
    @ActiveUser() user: ActiveUserInterface,
    @Body() createPostDto: CreatePostDto,
  ): any {
    return this.postsService.createPost(createPostDto, user);
  }

  /**
   * # [GET] /posts
   */
  @ApiOperation({
    summary: 'get all posts',
  })
  @ApiResponse({
    status: 200,
    description: 'get all post success when status = 200',
  })
  @Get('/get/all')
  public getAllPost() {
    return this.postsService.getAllPost();
  }

  // # [PATCH] /posts/
  @ApiOperation({
    summary: 'update post properties',
  })
  @ApiResponse({
    status: 200,
    description: 'update successfully',
  })
  @Patch()
  public updatePost(@Body() updatePatchDto: PatchPostDto) {
    return this.postsService.updatePost(updatePatchDto);
  }

  /**
   * # [DELETE] /posts/delete
   */
  @ApiOperation({
    summary: 'delete a post',
  })
  @ApiResponse({
    status: 200,
    description: 'delete a post successfull',
  })
  @Delete('/delete')
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
