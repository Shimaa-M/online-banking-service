import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Define the available environments for the project.
 */
enum Environment {
  Development = 'development',
  Test = 'test',
  Staging = 'staging',
  Production = 'production',
}

/**
 * Ogma's eight different logging levels.
 */
enum OgmaLogLevel {
  /** No logs are displayed through Ogma. console.log will still work */
  OFF = 'OFF',
  /** For when you just want to type fun stuff but don't really want people to see it (usually). Colored with Magenta */
  SILLY = 'SILLY',
  /** great for long strings of errors and things going on. Colored with Green */
  VERBOSE = 'VERBOSE',
  /** Just like the name implies, debugging! Colored with Blue */
  DEBUG = 'DEBUG',
  /** For normal logging, nothing special here. Colored with Cyan. */
  INFO = 'INFO',
  /** For errors about things that may be a problem. Colored with Yellow. */
  WARN = 'WARN',
  /** For errors about things that are a problem. Colored with Red. */
  ERROR = 'ERROR',
  /** Yeah, you should call someone at 3AM if this log ever shows up. Colored with Red. */
  FATAL = 'FATAL',
}
/**
 * Define and validate all env variables.
 */
export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV = Environment.Development;

  @IsString()
  APP_NAME: string;

  @IsString()
  LOG_LEVEL: OgmaLogLevel;

  /**
   * Sandbox mode, set to false to use live services (SendGrid, Slack, Sentry).
   */
  @IsIn([0, 1])
  SANDBOX_MODE: number;

  @IsNumber()
  PORT: number;

  @IsString()
  GLOBAL_PREFIX: string;

  @IsNumber()
  RATE_LIMIT: number;

  @IsString()
  DATABASE_HOST: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  API_URL: string;

  @IsString()
  GMAIL_FROM: string;

  @IsString()
  GMAIL_PASSWORD: string;

  @IsString()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsString()
  JWT_ACCESS_TOKEN_EXPIRY: string;

  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsString()
  JWT_REFRESH_TOKEN_EXPIRY: string;

}
