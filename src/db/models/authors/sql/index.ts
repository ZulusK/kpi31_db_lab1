import { sql } from '../../../../utils';
import { IBaseSqlQueryTree } from '../../BaseModel';
import { QueryFile } from 'pg-promise';

export interface IAuthorsSqlQueryTree extends IBaseSqlQueryTree {
  searchByName: QueryFile;
  searchById: QueryFile;
  updateById: QueryFile;
}
const tree: IAuthorsSqlQueryTree = sql.loadSqlFromDir(__dirname);
export default tree;
