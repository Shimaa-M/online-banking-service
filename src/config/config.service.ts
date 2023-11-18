import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CONFIG_MODULE_OPTIONS } from './config.constants';
import { ConfigModuleOptions } from './interfaces/config-options.interface';
import { EnvironmentVariables } from './model/env.model';

@Injectable()
export class ConfigService {
  /** Variable to hold the env variables. */
  private envConfig: EnvironmentVariables;

  constructor(@Inject(CONFIG_MODULE_OPTIONS) options: ConfigModuleOptions) {
    // Check that a config file is provided or using process.env is set to true
    if (!options.useProcess && !options.filename) {
      throw new Error(
        'Missing configuration options.' +
          ' If using process.env variables, please mark useProcess as "true".' +
          ' Otherwise, please provide an env file.',
      );
    }

    let config: { [key: string]: any };
    if (!options.useProcess && options.filename) {
      if (!process.env.PWD) {
        process.env.PWD = process.cwd();
      }
      // Read config from a file
      config = parse(readFileSync(join(process.env.PWD, options.filename)));
    } else {
      // Read config from process.env
      config = process.env;
    }

    this.envConfig = this.validateConfig(config);
  }

  /**
   * Validates and transforms configs.
   * @param {Record<string, any>} config
   * @returns {EnvironmentVariables}
   */
  private validateConfig(config: Record<string, any>): EnvironmentVariables {
    // Convert plain config to class
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return validatedConfig;
  }

  get appName(): string {
    return this.envConfig.APP_NAME;
  }

  get logLevel(): any {
    return this.envConfig.LOG_LEVEL;
  }

  get nodeEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  get isProd(): boolean {
    const env = this.nodeEnv.toLowerCase();
    return env === 'production';
  }

  /**
   * CORS (Cross-Origin Resource Sharing) config.
   */
  get cors() {
    const origin = {
      development: '*',
      staging: '*',
      test: [/localhost/],
      production: '*',
    };

    return origin[this.nodeEnv];
  }

  get globalPrefix(): string {
    return this.envConfig.GLOBAL_PREFIX;
  }

  get port(): number {
    return this.envConfig.PORT;
  }

  get rateLimit(): number {
    return this.envConfig.RATE_LIMIT;
  }

  get databaseHost(): string {
    return this.envConfig.DATABASE_HOST;
  }
  get databasePort(): number {
    return this.envConfig.DATABASE_PORT;
  }
  get databaseUsername(): string {
    return this.envConfig.DATABASE_USERNAME;
  }
  get databasePassword(): string {
    return this.envConfig.DATABASE_PASSWORD;
  }
  get databaseName(): string {
    return this.envConfig.DATABASE_NAME;
  }
  get apiUrl(): string {
    return this.envConfig.API_URL;
  }
  get gmailFrom(): string {
    return this.envConfig.GMAIL_FROM;
  }

  get gmailPassword(): string {
    return this.envConfig.GMAIL_PASSWORD;
  }

  get jwtAccessTokenSecret(): string {
    return this.envConfig.JWT_ACCESS_TOKEN_SECRET;
  }

  get jwtAccessTokenExpiry(): string {
    return this.envConfig.JWT_ACCESS_TOKEN_EXPIRY;
  }

  get jwtRefreshTokenSecret(): string {
    return this.envConfig.JWT_ACCESS_TOKEN_SECRET;
  }

  get jwtRefreshTokenExpiry(): string {
    return this.envConfig.JWT_ACCESS_TOKEN_EXPIRY;
  }
 
}
