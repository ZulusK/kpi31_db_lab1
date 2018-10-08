import * as Joi from 'joi';

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

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export default {
  IS_PRODUCTION: envVars.isProduction,
  ENV: envVars.NODE_ENV,
};
