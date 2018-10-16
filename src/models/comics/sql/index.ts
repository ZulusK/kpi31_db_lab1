import { sql } from '../../../utils';
import { QueryFile } from 'pg-promise';

export interface IQueryFilesTree {
  create:QueryFile;
  drop:QueryFile;
  empty:QueryFile;
  add:QueryFile;
  delete:QueryFile;
  findById:QueryFile;
  count:QueryFile;
  all:QueryFile;
}
const tree:IQueryFilesTree = sql.loadSqlFromDir(__dirname);
export default tree;
