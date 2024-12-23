import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true' ? true : false,
  synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
}));
