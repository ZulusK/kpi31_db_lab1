import { sql } from '../../../utils/index';
import { QueryFile } from 'pg-promise';

export interface IQueryFilesTree {
  createComicsCategory: QueryFile;
  dropComicsCategory: QueryFile;
  createCharacterGender: QueryFile;
}
const tree: IQueryFilesTree = sql.loadSqlFromDir(__dirname);
export default tree;
