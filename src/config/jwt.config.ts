import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  audience: process.env.JWT_TOKEN_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  TTL: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10), // jwt time to live
  refreshTTL: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? '86400', 10), // refresh token time to live
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
}));

/**
 * setup application on google cloud
 *
 * set up env file with id and secret key
 *
 * install package npm i google-auth-library
 *
 * create controller and service for Google endpoint
 *
 * config cors google token and change user entity password to optional add a new field call googleId
 *
 * create oauthClient when ever module is instanciated
 *
 * create some method authenticate in ggservice and method find one by ggid in user
 *
 * setup api endpoint and React app
 *
 * create provider create google user and complete case user does not exist
 *
 */
