import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ''),

    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    entities: [__dirname + '/../entity/*{.ts,.js}'],
    synchronize: true,
};

export const AppDataSource = new DataSource(typeOrmConfig as DataSourceOptions);
