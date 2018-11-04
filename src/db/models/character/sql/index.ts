import { sql } from '../../../../utils/index';
import { IBaseSqlQueryTree } from '../../BaseModel';

const tree: IBaseSqlQueryTree = sql.loadSqlFromDir(__dirname);
export default tree;
