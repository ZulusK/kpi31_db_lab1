// @ts-ignore
import * as cTable from 'cli-table';
import * as _ from 'lodash';

const tableBordersStyle = {
  top: '═',
  'top-mid': '╤',
  'top-left': '╔',
  'top-right': '╗',
  bottom: '═',
  'bottom-mid': '╧',
  'bottom-left': '╚',
  'bottom-right': '╝',
  left: '║',
  'left-mid': '╟',
  mid: '─',
  'mid-mid': '┼',
  right: '║',
  'right-mid': '╢',
  middle: '│',
};
export default class TableView {
  private table: cTable;

  public constructor(data: object[]) {
    this.buildTable(data);
  }

  public set data(value:object[]) {
    this.buildTable(value);
  }

  public toString():string {
    return this.table.toString();
  }

  private buildTable(data:object[]) {
    this.table = new cTable({
      chars: tableBordersStyle ,
      head: data.length ? Object.keys(data[0]) : undefined,
    });
    _.forEach(data, (v) => {
      this.table.push(_.reduce(v,  (memo:string[], field:any) => {
        memo.push(field || 'null');
        return memo;
      },
                               []));
    });
  }
}
