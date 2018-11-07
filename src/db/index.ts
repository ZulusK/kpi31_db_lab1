import * as pgPromise from 'pg-promise';
import * as config from '../config/index';
// import * as pgMonitor from './diagnostic';
import { getLogger } from '../helpers/logger';
import * as models from './models';
import * as types from './types';
export interface IProjectDatabase
  extends pgPromise.IDatabase<models.IDbRepos>,
    models.IDbRepos {}
const log = getLogger({ name: 'db' });

const initOptions: pgPromise.IOptions<models.IDbRepos> = {
  extend(obj: IProjectDatabase) {
    obj.comics = new models.ComicsModel(obj, pgp);
    obj.series = new models.SeriesModel(obj, pgp);
    obj.characters = new models.CharactersModel(obj, pgp);
    obj.authors = new models.AuthorsModel(obj, pgp);
    obj.comicsAuthors = new models.ComicsAuthorsModel(obj, pgp);
  },
};

const pgp = pgPromise(initOptions);

const db: IProjectDatabase = pgp({
  host: config.db.HOST,
  port: config.db.PORT,
  database: config.db.NAME,
  user: config.db.USER,
  password: config.db.PASSWORD,
});
// pgMonitor.init(initOptions);

db.connect()
  .then(obj => {
    log.info('connected');
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    log.error('unable to connect');
    log.error('%O', error.message || error);
    throw error;
  });

export async function init() {
  try {
    await types.init(db);
    await models.init(db);
  } catch (error) {
    log.error(error);
    throw error;
  }
}

export { db };
