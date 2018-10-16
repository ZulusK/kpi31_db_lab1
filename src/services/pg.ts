import * as pgPromise from 'pg-promise';
import * as config from '../config';
import * as pgMonitor from './pg-monitor';

interface IProjectDatabase extends pgPromise.IDatabase<{}> {
}
const initOptions:pgPromise.IOptions<{}> = {

};
const pgp = pgPromise(initOptions);
let db: pgPromise.IDatabase<{}>;

export function connect(): IProjectDatabase {
  db = pgp({
    host: config.db.HOST,
    port: config.db.PORT,
    database: config.db.NAME,
    user: config.db.USER,
    password: config.db.PASSWORD,
  });
  pgMonitor.init(initOptions);
  return db;
}

export function getClient(): IProjectDatabase {
  if (db === undefined) {
    connect();
  }
  return db;
}
