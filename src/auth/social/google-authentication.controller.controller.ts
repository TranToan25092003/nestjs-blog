import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthenticationService } from './providers/google-authentication.service';
import { ApiTags } from '@nestjs/swagger';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { Auth } from '../decorator/auth.decorator';
import { AuthType } from '../enums/authType.enum';

@Controller('/auth/google-authentication')
@ApiTags('google authentication')
@Auth(AuthType.None) // public router
export class GoogleAuthenticationControllerController {
  /**
   * constructor
   */
  constructor(
    /**
     * inject google authentication service
     */
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  /**
   * google authenticate
   */

  @Post('')
  public async googleAuthenticate(@Body() googleTokenDto: GoogleTokenDto) {
    return this.googleAuthenticationService.authenticate(googleTokenDto);
  }
}
