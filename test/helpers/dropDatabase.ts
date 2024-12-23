import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const dropDatabase = async (configService: ConfigService) => {
  // connect to db
  const dataSource = await new DataSource({
    type: 'postgres',
    synchronize: configService.get<boolean>('database.synchronize'),
    port: configService.get<number>('database.port'),
    username: configService.get<string>('database.username'),
    password: configService.get<string>('database.password'),
    host: configService.get<string>('database.host'),
    database: configService.get<string>('database.database'),
  }).initialize();

  // clean the db
  await dataSource.dropDatabase();

  // close db connect
  await dataSource.destroy();
};
