import { createLogger, format, transports , Logger } from 'winston';
import * as moment from 'moment';
import * as config from '../config';

function customPrintf() {
  if (config.log.IS_TIMESTAMPS_ENABLED) {
    return format.printf(
        // tslint:disable-next-line:max-line-length
          (info: any) => `[${moment().format('HH:MM:SS D/M/YY')}] [${info.label}] ${info.level}: ${info.message}`,
      );
  }
  return format.printf(
        info => `[${info.label}] ${info.level}: ${info.message}`,
    );
}

const options = {
  file: {
    level: config.log.LEVEL,
    filename: config.log.OUTPUT_FILE,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    silent: !config.log.IS_ENABLED,
  },
  console: {
    level: config.log.LEVEL,
    json: false,
    colorize: true,
    silent: !config.log.IS_ENABLED,
  },
};

export function getLogger({ module, name }:{module?:any, name?:string}):Logger {
  let label = null;
  if (module) {
    label = module.filename
            .split('/')
            .slice(-2)
            .join('/');
  } else {
    label = name || '';
  }
  return createLogger({
    transports: [
      new transports.File({
        format: format.combine(format.label({ label }), format.splat(), customPrintf()),
        ...options.file,
      }),
      new transports.Console({
        ...options.console,
        format: format.combine(
                    format.label({ label }),
                    format.colorize(),
                    format.splat(),
                    format.json({ space: 2 }),
                    customPrintf(),
                ),
      }),
    ],
  });
}
