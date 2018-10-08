import * as config from './config';
import { getLogger } from './helpers/logger';

const logger = getLogger({ name:'index' });

logger.info('App started in %s mode', config.env.ENV);
