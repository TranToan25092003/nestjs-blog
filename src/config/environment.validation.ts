import * as joi from 'joi';

export default joi.object({
  NODE_ENV: joi
    .string()
    .valid('development', 'production', 'staging', 'test')
    .default('development'),
  DATABASE_PORT: joi.number().port().default(5432),
  DATABASE_PASSWORD: joi.string().required(),
  DATABASE_USER: joi.string().required(),
  DATABASE_NAME: joi.string().required(),
  DATABASE_HOST: joi.string().required(),
  GOOGLE_API_KEY: joi.string(),
  JWT_SECRET: joi.string().required(),
  JWT_TOKEN_AUDIENCE: joi.string().required(),
  JWT_ISSUER: joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: joi.number().default(3600),
  JWT_REFRESH_TOKEN_TTL: joi.number().default(86400),
  GOOGLE_CLIENT_ID: joi.string(),
  GOOGLE_CLIENT_SECRET: joi.string(),
  API_VERSION: joi.string().required(),
  MAIL_HOST: joi.string().required(),
  SMTP_USERNAME: joi.string().required(),
  SMTP_PASSWORD: joi.string().required(),
});
