import * as Joi from 'joi';

interface IExpectedEnv {
  NODE_ENV: string;
  DEBUG: string;
  LOG_LVL: string;
  LOG_TIMESTAMPS: boolean;
  LOG_ENABLED: string;
  ENABLE_LOG: boolean;
}

interface IEnvEnvironment {
  IS_PRODUCTION: boolean;
  ENV: string;
}

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  IS_PROD: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('production'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate<IExpectedEnv>(process.env as any, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const config: IEnvEnvironment = {
  IS_PRODUCTION: envVars.NODE_ENV === 'production',
  ENV: envVars.NODE_ENV,
};
export default config;
