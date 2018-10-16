import * as pgPromise from 'pg-promise';
import * as config from '../config';
import * as pgMonitor from './pg-monitor';
import { getLogger } from '../helpers/logger';

interface IProjectDatabase extends pgPromise.IDatabase<{}> {
}
const log = getLogger({ module });
const initOptions: pgPromise.IOptions<{}> = {
};

const pgp = pgPromise(initOptions);

const db: pgPromise.IDatabase<{}> = pgp({
  host: config.db.HOST,
  port: config.db.PORT,
  database: config.db.NAME,
  user: config.db.USER,
  password: config.db.PASSWORD,
});
pgMonitor.init(initOptions);

db.connect()
  .then((obj) => {
    log.info('connected');
    obj.done(); // success, release the connection;
  })
  .catch((error) => {
    log.error('unable to connect');
    log.error('%O', error.message || error);
    throw error;
  });

db.connect();

export function getClient(): IProjectDatabase {
  return db;
}
