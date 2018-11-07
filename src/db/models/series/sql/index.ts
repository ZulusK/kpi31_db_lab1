import { sql } from '../../../../utils/index';
import { IBaseSqlQueryTree } from '../../BaseModel';
import { QueryFile } from 'pg-promise';

export interface ISeriesSqlQueryTree extends IBaseSqlQueryTree {
  searchById: QueryFile;
  updateById: QueryFile;
}
const tree: ISeriesSqlQueryTree = sql.loadSqlFromDir(__dirname);
export default tree;
