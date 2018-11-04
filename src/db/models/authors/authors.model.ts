import { IMain } from 'pg-promise';
import { default as sql } from './sql';
import { CharacterGender } from '../../types';
import { BaseModel, IBaseRecord } from '../BaseModel';
import { IProjectDatabase } from '../../index';

export interface IAuthor extends IBaseRecord {
  name: string;
  dob: Date;
  country: string;
  gender: CharacterGender;
}

export class AuthorsModel extends BaseModel<IAuthor> {
  constructor(db: IProjectDatabase, pgp: IMain) {
    super(db, pgp, sql);
  }
}
