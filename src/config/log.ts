import * as Joi from 'joi';
import * as path from 'path';

interface IExpectedEnv {
  NODE_ENV: string;
  DEBUG: string;
  LOG_LVL: string;
  LOG_TIMESTAMPS: boolean;
  LOG_ENABLED: string;
  ENABLE_LOG: boolean;
}

interface ILogEnvironment {
  IS_ENABLED: boolean;
  LEVEL: string;
  IS_TIMESTAMPS_ENABLED: boolean;
  OUTPUT_FILE: string;
}

// define validation for all the env vars
const envVarsSchema = Joi.object({
  DEBUG: Joi.string(),
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  LOG_LVL: Joi.string().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.string().default('debug'),
    otherwise: Joi.string().default('info'),
  }),
  LOG_TIMESTAMPS: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('production'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
  LOG_ENABLED: Joi.boolean().when('DEBUG', {
    is: Joi.string().exist(),
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

const config: ILogEnvironment = {
  IS_ENABLED: !envVars.ENABLE_LOG ? !!envVars.DEBUG || envVars.NODE_ENV !== 'test' : true,
  LEVEL: envVars.LOG_LVL,
  IS_TIMESTAMPS_ENABLED: envVars.LOG_TIMESTAMPS,
  OUTPUT_FILE: path.join(__dirname, '../../logs/app.log'),
};

export default config;
