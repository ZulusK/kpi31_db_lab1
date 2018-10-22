import sql from './sql';
import { IProjectDatabase } from '../index';

export enum EComicsCategory {
  manga,
  'science fiction',
  fantasy,
  action,
  horror,
  romance,
  adult,
}

export async function init(db:IProjectDatabase) {
  await db.none(sql.createComicsCategory);
}
