import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({ path: './.env.development' });

export const AppDataSource = new DataSource({
    type: 'postgres', // Change this to your database type
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT as unknown as number,
    username: process.env.DATABASE_USERNAME,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + 'src/**/*.entity{.ts,.js}'],
   // synchronize: true, // In development, set to false in production
    logging: true,
    migrations: [__dirname + 'migrations/*{.ts,.js}']
  }) ;

 