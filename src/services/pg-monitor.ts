import * as pgMonitor from 'pg-monitor';
import { IOptions } from 'pg-promise';
import * as config from '../config';
import { getLogger } from '../helpers/logger';
import * as Debug from 'debug';

const debug = Debug('app:pg:monitor');

pgMonitor.setTheme('matrix'); // changing the default theme;
const log = getLogger({ name: 'pg' });

pgMonitor.setLog((msg, info) => {
  info.display = false; // display nothing;
  if (info.event === 'error') {
    log.error('%O', msg);
  }
  debug(msg);
});
// Monitor initialization function;
export function init(options: IOptions<any>) {
  if (!config.env.IS_PRODUCTION) {
      // In a DEV environment, we attach to all supported events:
    pgMonitor.attach(options);
  } else {
      // In a PROD environment we should only attach to the type of events
      // that we intend to log. And we are only logging event 'error' here:
    pgMonitor.attach(options, ['error']);
  }
}
