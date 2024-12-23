import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamDto } from './dtos/get-users-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/authType.enum';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  /**
   * constructor
   */
  constructor(
    /**
     * inject user service
     */
    private readonly userService: UserService,
  ) {}

  /**
   * example of API swagger
   */

  @ApiOperation({
    summary: 'get a list of users from list',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucessfully',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'number of return data',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'enter the nth page',
    example: 2,
  })
  @Auth(AuthType.None, AuthType.Bearer)
  @Get('/:id?')
  public test(
    @Param() getUserParamDto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(99), ParseIntPipe)
    limit: number | undefined,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number | undefined,
  ) {
    return this.userService.findAll(getUserParamDto, limit, page);
  }

  /**
   * create a new user
   */
  @ApiOperation({
    summary: 'create new user',
  })
  @ApiResponse({
    status: 201,
    description: 'when create a new user success code 201 will be return',
  })
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor) // use class interceptor
  @Post('create')
  public createUser(@Body() newUSer: CreateUserDto): Promise<User> {
    return this.userService.createUser(newUSer);
  }

  /**
   * create many user
   */
  @ApiOperation({
    summary: 'create many users',
  })
  @ApiResponse({
    status: 201,
    description: 'when create a new user success code 201 will be return',
  })
  @Post('/create/many')
  public createManyUsers(@Body() newUserArray: CreateManyUsersDto) {
    return this.userService.createMultip(newUserArray);
  }
}
