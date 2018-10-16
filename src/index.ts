import * as config from './config';
import { getLogger } from './helpers/logger';
import * as pgservice from './services/pg';

const logger = getLogger({ name: 'index' });

pgservice.connect();

logger.info('App started in %s mode', config.env.ENV);
