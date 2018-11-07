// @ts-ignore
import { table, getBorderCharacters, TableUserConfig } from 'table';
import * as _ from 'lodash';
import chalk from 'chalk';

const config: TableUserConfig = {
  border: getBorderCharacters('honeywell'),
};

export interface TableViewOptions {
  maxLength?: number;
  aggregate?: string;
  cropStrategy?: (text: string, opts: TableViewOptions) => string;
}

const defaultTableOpts: TableViewOptions = {
  maxLength: 25,
  aggregate: '-',
  cropStrategy: cropTextAndAddDots,
};

export function cropText(text: string, opts: TableViewOptions): string {
  if (opts.maxLength && text.length > opts.maxLength) {
    return text.substr(0, opts.maxLength);
  }
  return text;
}

export function cropTextAndAddDots(
  text: string,
  opts: TableViewOptions,
): string {
  if (opts.maxLength && text.length > opts.maxLength) {
    return `${text.substr(0, opts.maxLength - 3)}...`;
  }
  return text;
}

function normalize(
  value: any,
  index: number,
  opts: TableViewOptions,
  tableConfig: TableUserConfig,
) {
  if (_.isNull(value) || _.isUndefined(value)) {
    return opts.aggregate;
  }
  if (_.isBoolean(value)) {
    return value ? '+' : '-';
  }
  const strValue = String(value);
  if (opts.maxLength && opts.maxLength && strValue.length > opts.maxLength) {
    // @ts-ignore
    tableConfig.columns[index] = {
      // @ts-ignore
      ...tableConfig.columns[index],
      width: opts.maxLength,
    };
  }
  return opts.cropStrategy ? opts.cropStrategy(strValue, opts) : strValue;
}

export default class TableView {
  public static empty() {
    return table([[chalk.redBright('empty')]], config);
  }

  public static buildTable(data: any, opts: TableViewOptions = {}): string {
    opts = _.defaultsDeep(opts, defaultTableOpts);
    if (!data || !data.length) {
      return TableView.empty();
    }
    const headers = data.length
      ? Object.keys(data[0]).map(h => chalk.yellow(h))
      : undefined;
    const tableConfig: TableUserConfig = {
      ...config,
      columns: {},
    };
    const tableData = [
      headers,
      ...data.map((row: any) =>
        Object.values(row).map((v, i) => normalize(v, i, opts, tableConfig)),
      ),
    ];
    return table(tableData, tableConfig);
  }
}
