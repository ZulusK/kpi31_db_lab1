import sql from './sql';
import { IProjectDatabase } from '../index';
import { ts } from '../../utils';

export enum EComicsCategory {
  manga,
  'science fiction',
  fantasy,
  action,
  horror,
  romance,
  adult,
}

export const comicsCategories: EComicsCategory[] =
  ts.keysFromEnum<EComicsCategory>(EComicsCategory);

export async function init(db: IProjectDatabase) {
  await db.none(sql.createComicsCategory);
}
