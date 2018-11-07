import * as pgMonitor from 'pg-monitor';
import { IOptions } from 'pg-promise';
import * as config from '../config/index';
import { getLogger } from '../helpers/logger';
import * as Debug from 'debug';

const debug = Debug('app:pg:monitor');
const log = getLogger({ name: 'db:monitor' });

pgMonitor.setTheme('matrix'); // changing the default theme;
pgMonitor.setLog((msg, info) => {
  info.display = false; // display nothing;
  if (info.event === 'error') {
    log.error('%s', msg, info);
  }else {
    debug('%s', msg);
  }
});

// Monitor initialization function;
export function init(options: IOptions<any>) {
  if (!config.env.IS_PRODUCTION) {
    pgMonitor.attach(options);
  } else {
    pgMonitor.attach(options, ['error']);
  }
}
