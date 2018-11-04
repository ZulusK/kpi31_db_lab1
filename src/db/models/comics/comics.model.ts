import { IMain } from 'pg-promise';
import { default as sql } from './sql';
import { ComicsCategory } from '../../types';
import { BaseModel, IBaseRecord } from '../BaseModel';
import { IProjectDatabase } from '../../index';

export interface IComics extends IBaseRecord {
  title: string;
  publish_date?: Date;
  serieId?: number;
  category?: ComicsCategory;
  rating?: number;
}

export class ComicsModel extends BaseModel<IComics> {
  constructor(db: IProjectDatabase, pgp: IMain) {
    super(db, pgp, sql);
  }
  allNames() {
    return this.db.many<{ title: string }>('SELECT title from comics');
  }
}
