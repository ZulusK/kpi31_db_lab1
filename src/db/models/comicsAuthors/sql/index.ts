import { sql } from '../../../../utils/index';
import { IBaseSqlQueryTree } from '../../BaseModel';
import { QueryFile } from 'pg-promise';

export interface IComicsAuthorsSqlQueryTree extends IBaseSqlQueryTree {
  listComicsByAuthor: QueryFile;
}
const tree: IComicsAuthorsSqlQueryTree = sql.loadSqlFromDir(__dirname);
export default tree;
