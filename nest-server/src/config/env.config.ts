import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

const envValidationSchema = Joi.object({
  TELEGRAM_BOT_TOKEN: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  JWT_KEY: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_DB_NAME: Joi.string().required(),
});

export const envConfig = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env'],
    validationSchema: envValidationSchema,
  }),
];
