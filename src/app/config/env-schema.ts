import * as Joi from 'joi';

export const envSchema = Joi.object({
  PORT: Joi.string().default(3000),
  // API_KEY: Joi.string().required(),
  // NODE_ENV: Joi.string().default('development'),
  // SENTRY_DSN: Joi.string().required(),
  // SENTRY_ENABLED: Joi.string().default('false').allow('true', 'false'),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('1h'),
  MONGO_URI: Joi.string().required(),
});