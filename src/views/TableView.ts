// @ts-ignore
import { table, getBorderCharacters, TableUserConfig } from 'table';
import * as _ from 'lodash';
import chalk from 'chalk';

const config: TableUserConfig = {
  border: getBorderCharacters('honeywell'),
};

export interface TableViewOptions {
  maxLength: 25;
  aggregate: string;
  cropStrategy: (text: string, opts: TableViewOptions) => string;
}
const defaultTableOpts: TableViewOptions = {
  maxLength: 25,
  aggregate: '-',
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
  if (!value) {
    return opts.aggregate;
  }
  const strValue = String(value);
  if (strValue.length > opts.maxLength) {
    // @ts-ignore
    tableConfig.columns[index] = {
      // @ts-ignore
      ...tableConfig.columns[index],
      width: opts.maxLength,
    };
  }
  return opts.cropStrategy(strValue, opts);
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
        Object.values(row).map((v, i) => normalize(v, i, opts, tableConfig)),
      ),
    ];
    return table(tableData, tableConfig);
  }
}
