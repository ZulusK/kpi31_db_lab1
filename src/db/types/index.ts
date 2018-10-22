import sql from './sql';
import { IProjectDatabase } from '../index';
import { isNumber } from 'lodash';

export enum EComicsCategory {
  manga,
  'science fiction',
  fantasy,
  action,
  horror,
  romance,
  adult,
}

export const comicsCategories: [EComicsCategory] = Object.keys(
  EComicsCategory,
).filter((f: any) => isNumber(EComicsCategory[f])) as any;
export async function init(db: IProjectDatabase) {
  await db.none(sql.createComicsCategory);
}
