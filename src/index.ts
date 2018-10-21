import * as config from './config';
import { getLogger } from './helpers/logger';
import * as db from './db';
const log = getLogger({ name: 'index' });
log.info('App started in %s mode', config.env.ENV);

db.init().then(() => {
  log.info('db had initialized');
});
