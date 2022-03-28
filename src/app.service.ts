import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';


import config from '../config';

@Injectable()
export class AppService {
  constructor(
    //@Inject('API_KEY') private apiKey: string,
    //@Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('PG') private clientePg: Client
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    return `Hola ${apiKey},${dbName}`;
  }

  getTasks()  {
    return new Promise((resolve, reject) => {
      this.clientePg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        };
        resolve(res.rows);
    });
  });
  }
}
