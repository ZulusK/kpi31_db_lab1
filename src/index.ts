import * as config from './config';
import { getLogger } from './helpers/logger';
import { start } from './controllers';

const log = getLogger({ name: 'index' });
log.info('App started in %s mode', config.env.ENV);

start();
