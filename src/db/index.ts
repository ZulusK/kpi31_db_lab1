import * as config from '../config/index';
import { knexSnakeCaseMappers, Model } from 'objection';
import * as knex from 'knex';

const knexConnection = knex({
  client: 'pg',
  connection: {
    host: config.db.HOST,
    port: config.db.PORT,
    database: config.db.NAME,
    user: config.db.USER,
    password: config.db.PASSWORD
  },
  acquireConnectionTimeout: 10000,
  pool: {
    min: 1,
    max: 50
  },
  ...knexSnakeCaseMappers()
});
Model.knex(knexConnection);

export * from './models';
