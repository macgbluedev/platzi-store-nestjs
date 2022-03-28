import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm'

import config from '../../config'

const API_KEY = 'dev_12345';
const API_KEY_PROD = 'prod_12345';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory:( configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.mysql;
        return {
          type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    })
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: ( configService: ConfigType<typeof config>) => {

        const { user, host, dbName, password, port } = configService.postgres;
        const client = new Client({
          user,
          host,
          database: dbName,
          password: password,
          port: port,
        });

        client.connect();
        return client;

      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
