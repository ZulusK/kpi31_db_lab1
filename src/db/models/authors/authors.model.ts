import { IMain } from 'pg-promise';
import { default as sql, IAuthorsSqlQueryTree } from './sql';
import { CharacterGender } from '../../types';
import { BaseModel, IBaseRecord } from '../BaseModel';
import { IProjectDatabase } from '../../index';

export interface IAuthor extends IBaseRecord {
  name: string;
  dob: Date;
  country: string;
  gender: CharacterGender;
}

export class AuthorsModel extends BaseModel<IAuthor, IAuthorsSqlQueryTree> {
  constructor(db: IProjectDatabase, pgp: IMain) {
    super(db, pgp, sql);
  }
  searchByName(name: string) {
    return this.db.manyOrNone(this.sql.searchByName, { name });
  }
  searchById(id: string) {
    return this.db.manyOrNone(this.sql.searchById, { id });
  }
  updateById(targetId: any, newData: IAuthor) {
    return this.db.oneOrNone(this.sql.updateById, { targetId, ...newData });
  }
}
