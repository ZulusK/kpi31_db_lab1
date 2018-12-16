const keypress = require('keypress');
import * as _ from 'lodash';

export interface IInputHanler {
  key?: string;
  action: () => any;
}

export function dynamicView(handlers: IInputHanler [], cancelOn: string, after?: () => any) {
  return new Promise((resolve) => {
    const { stdin } = process;
    keypress(process.stdin);
    // @ts-ignore
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    const listener = async (__: any, key: any) => {
      if (key.name === cancelOn) {
        // @ts-ignore
        process.stdin.pause();
        process.stdin.removeListener('keypress', listener);
        return resolve();
      }
      await _.forEach(handlers, async (handler: IInputHanler) => {
        if (handler.key === key.name) {
          await handler.action();
        }
      });
      if (after) {
        await after();
      }
    };
    process.stdin.on('keypress', listener);
    // @ts-ignore
    process.stdin.setRawMode(true);
    process.stdin.resume();
  });
}
