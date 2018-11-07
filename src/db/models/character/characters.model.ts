import { IMain } from 'pg-promise';
import { default as sql } from './sql';
import { CharacterGender } from '../../types';
import { BaseModel, IBaseRecord, IBaseSqlQueryTree } from '../BaseModel';
import { IProjectDatabase } from '../../index';

export interface ICharacter extends IBaseRecord {
  name: string;
  nickname: string;
  dob: Date;
  is_hero: boolean;
  gender: CharacterGender;
  skills: string;
}

export class CharactersModel extends BaseModel<ICharacter, IBaseSqlQueryTree> {
  constructor(db: IProjectDatabase, pgp: IMain) {
    super(db, pgp, sql);
  }
}
