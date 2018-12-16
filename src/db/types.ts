import { ts } from '../utils';

export enum ComicsCategory {
  'manga',
  'science fiction',
  'fantasy',
  'action',
  'horror',
  'romance',
  'adult',
}

export enum CharacterGender {
  'male',
  'female',
}

export const comicsCategories: string[] = ts.keysFromEnum(ComicsCategory);
export const genders: string[] = ts.keysFromEnum(CharacterGender);
