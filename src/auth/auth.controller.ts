import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/singin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from './decorator/auth.decorator';
import { AuthType } from './enums/authType.enum';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  /**
   * constructor
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * signin
   */
  @ApiOperation({
    summary: 'signin ',
  })
  @ApiResponse({
    status: 200,
    description: 'login success when status = 200',
  })
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  @Post('/signin')
  public async signin(@Body() signinDto: SignInDto) {
    return this.authService.signin(signinDto);
  }

  @ApiOperation({
    summary: 'regenerate access and refresh token',
  })
  @ApiResponse({
    status: 200,
    description: 'regenerate sucess',
  })
  @Auth(AuthType.None)
  @Post('refresh-token')
  public refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
