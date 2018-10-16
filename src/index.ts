import * as config from './config';
import { getLogger } from './helpers/logger';
import * as pgService from './services/pg';


// @ts-ignore
const db = pgService.getClient();
const logger = getLogger({ name: 'index' });

logger.info('App started in %s mode', config.env.ENV);
