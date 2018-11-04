import sql from './sql';
import { IProjectDatabase } from '../index';
import { ts } from '../../utils';

export enum ComicsCategory {
  manga,
  'science fiction',
  fantasy,
  action,
  horror,
  romance,
  adult,
}
export enum CharacterGender {
  male,
  female,
}
export const comicsCategories: string[] = ts.keysFromEnum(ComicsCategory);
export const charactersGenders: string[] = ts.keysFromEnum(CharacterGender);

export async function init(db: IProjectDatabase) {
  await db.none(sql.createComicsCategory);
  await db.none(sql.createCharacterGender);
}
