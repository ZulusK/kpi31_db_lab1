import * as config from './config';
import { getLogger } from './helpers/logger';
import * as db from './db';
import { start } from './controllers';

const log = getLogger({ name: 'index' });
log.info('App started in %s mode', config.env.ENV);

db.init().then(start);
