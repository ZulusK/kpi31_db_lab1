import * as config from './config';
import { getLogger } from './helpers/logger';
import * as db from './db';
import TableView from './views/TableView';

const log = getLogger({ name: 'index' });
log.info('App started in %s mode', config.env.ENV);

db.init().then(start);

async function start() {
  log.info('start');
  console.log(new TableView(await db.db.comics.all()).toString());
}
