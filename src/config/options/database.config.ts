import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class TypeOrmModuleConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return  {
      type: 'postgres', // Change this to your database type
      host: this.configService.databaseHost,
      port: this.configService.databasePort,
      username: this.configService.databaseUsername,
      password: this.configService.databasePassword,
      database: this.configService.databaseName,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: true, // In development, set to false in production
      logging: true,
      autoLoadEntities: true,
      migrations: [__dirname + 'migrations/*{.ts,.js}']
    } ;
   }
  
}

