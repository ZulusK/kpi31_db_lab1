const clear = require('clear');
import { dynamicView } from './DynamicView';

export interface IListFunctionArgs {
  limit: number;
  offset: number;
}

export type IListFunction = (args: IListFunctionArgs) => Promise<any>;

export default class InteractiveTableView {
  static async display(listFunction: IListFunction, offset: number, limit: number): Promise<any> {
    clear();
    await listFunction({ limit, offset });
    console.log('Use arrows to navigate');
    console.log('Press "q" to exit');
    await dynamicView(
      [
        {
          key: 'up',
          action: async () => {
            limit = Math.max(limit - 1, 1);
            await listFunction({ offset, limit });
            console.log('Use arrows to navigate');
            console.log('Press "q" to exit');
          },
        },
        {
          key: 'down',
          action: async () => {
            limit = Math.min(limit + 1, 100);
            await listFunction({ offset, limit });
            console.log('Use arrows to navigate');
            console.log('Press "q" to exit');
          },
        },
        {
          key: 'right',
          action: async () => {
            offset = Math.max(offset + limit, 0);
            await listFunction({ offset, limit });
            console.log('Use arrows to navigate');
            console.log('Press "q" to exit');
          },
        },
        {
          key: 'left',
          action: async () => {
            offset = Math.max(offset - limit, 0);
            await listFunction({ offset, limit });
            console.log('Use arrows to navigate');
            console.log('Press "q" to exit');
          },
        },
      ],
      'q');
    clear();
  }
}
