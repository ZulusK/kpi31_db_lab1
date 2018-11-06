import { IMain } from 'pg-promise';
import { default as sql } from './sql';
import { BaseModel, IBaseRecord, IBaseSqlQueryTree } from '../BaseModel';
import { IProjectDatabase } from '../../index';

export interface IComicsAuthors extends IBaseRecord {
  title: string;
  rating: number;
}
export class ComicsAuthorsModel extends BaseModel<
  IComicsAuthors,
  IBaseSqlQueryTree
> {
  constructor(db: IProjectDatabase, pgp: IMain) {
    super(db, pgp, sql);
  }
}
