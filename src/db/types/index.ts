import sql from './sql';
import { IProjectDatabase } from '../index';

export enum ComicsCategory {
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
