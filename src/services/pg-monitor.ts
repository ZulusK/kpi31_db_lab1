import * as pgMonitor from 'pg-monitor';
import { IOptions } from 'pg-promise';
import * as config from '../config';
import { getLogger } from '../helpers/logger';

pgMonitor.setTheme('matrix'); // changing the default theme;
const log = getLogger({ name: 'pg' });

pgMonitor.setLog((msg, info) => {
  if (info.event === 'error') {
    log.error('%O', msg);
  }
  if (config.env.IS_PRODUCTION) {
    // If it is not a DEV environment:
    info.display = false; // display nothing;
  }
});
// Monitor initialization function;
export function init(options: IOptions<any>) {
  if (config.env.IS_PRODUCTION) {
      // In a DEV environment, we attach to all supported events:
    pgMonitor.attach(options);
  } else {
      // In a PROD environment we should only attach to the type of events
      // that we intend to log. And we are only logging event 'error' here:
    pgMonitor.attach(options, ['error']);
  }
}
