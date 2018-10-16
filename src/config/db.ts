import * as Joi from 'joi';

interface IExpectedEnv {
  NODE_ENV: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_PASSWORD: string;
  DB_USER: string;
}
interface IDBConfig {
  NAME: string;
  HOST: string;
  PORT: number;
  PASSWORD: string;
  USER: string;
}
// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  DB_NAME: Joi.string().default('lab1Db'),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_USER: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate<IExpectedEnv>(process.env as any, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config: IDBConfig = {
  NAME: envVars.DB_NAME,
  HOST: envVars.DB_HOST,
  PORT: envVars.DB_PORT,
  PASSWORD: envVars.DB_PASSWORD,
  USER: envVars.DB_USER,
};

export default config;
