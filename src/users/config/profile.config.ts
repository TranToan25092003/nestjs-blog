import { registerAs } from '@nestjs/config';

export default registerAs('profileConfig', () => ({
  apiKey: process.env.GOOGLE_API_KEY,
}));
