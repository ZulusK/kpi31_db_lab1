// @ts-ignore
import { table, getBorderCharacters, TableUserConfig } from 'table';
import * as _ from 'lodash';
import chalk from 'chalk';

const config: TableUserConfig = {
  border: getBorderCharacters('honeywell'),
};

export interface TableViewOptions {
  maxLength: 25;
  cropStrategy: (text: string, opts: TableViewOptions) => string;
}
const defaultTableOpts: TableViewOptions = {
  maxLength: 25,
  cropStrategy: cropTextAndAddDots,
};

export function cropText(text: string, opts: TableViewOptions): string {
  if (text.length > opts.maxLength) {
    return text.substr(0, opts.maxLength);
  }
  return text;
}

export function cropTextAndAddDots(
  text: string,
  opts: TableViewOptions,
): string {
  if (text.length > opts.maxLength) {
    return text.substr(0, opts.maxLength - 3) + '...';
  }
  return text;
}

export default class TableView {
  public static buildTable(data: object[], opts = defaultTableOpts): string {
    const headers = data.length
      ? Object.keys(data[0]).map(h => chalk.yellow(h))
      : undefined;
    const tableConfig: TableUserConfig = {
      ...config,
      columns: {},
    };
    const tableData = [
      headers,
      ...data.map(row =>
        Object.values(row).map((v: any, i: number) => {
          if (!v) {
            return 'null';
          }
          const strValue = String(v);
          if (strValue.length > opts.maxLength) {
            // @ts-ignore
            tableConfig.columns[i] = {
              // @ts-ignore
              ...tableConfig.columns[i],
              width: opts.maxLength,
            };
          }
          return opts.cropStrategy(strValue, opts);
        }),
      ),
    ];
    return table(tableData, tableConfig);
  }
}
