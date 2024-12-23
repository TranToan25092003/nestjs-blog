import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UserService } from 'src/users/providers/users.service';
import { GenerateTokenProvider } from 'src/auth/providers/generate-token.provider';
import { GoogleUserInterface } from 'src/users/interfaces/google-user.interface';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  // variable contain oauthGoogle
  private oauthClient: OAuth2Client;

  /**
   * constructor
   */
  constructor(
    /**
     * inject jwt config
     */
    private readonly configService: ConfigService,

    /**
     * inject user service
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    /**
     * inject generate token provider
     */
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  /**
   * method create an instance of oauthClient when module is instanciated
   */
  onModuleInit() {
    // get client id
    const clientId = this.configService.get('jwt.googleClientId');

    //get client secret
    const clientSecret: string = this.configService.get(
      'jwt.googleClientSecret',
    );

    // instanciate oauthClient
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      // verify token
      const googleTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });

      // get payload
      const { email, sub: googleId } = googleTicket.getPayload();

      // find user in db
      let user = await this.userService.getUserByGGId(googleId);

      // user already exist
      if (user) {
        return await this.generateTokenProvider.generateTokens(user);
      }

      // generate user if not exist
      const { given_name: firstName, family_name: lastName } =
        googleTicket.getPayload();

      const newGoogleUserData: GoogleUserInterface = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        googleId: googleId,
      };

      // create new user
      const newGoogleUser =
        await this.userService.createGoogleUser(newGoogleUserData);

      // generate token
      return await this.generateTokenProvider.generateTokens(newGoogleUser);
    } catch (error) {
      // throw exception
      throw new UnauthorizedException(error);
    }
  }
}
