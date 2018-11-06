import { IMain } from 'pg-promise';
import { default as sql, IComicsAuthorsSqlQueryTree } from './sql';
import { BaseModel, IBaseRecord } from '../BaseModel';
import { IProjectDatabase } from '../../index';

export interface IComicsAuthors extends IBaseRecord {
  comicsId: number;
  authorId: number;
}
export class ComicsAuthorsModel extends BaseModel<
  IComicsAuthors,
  IComicsAuthorsSqlQueryTree
> {
  constructor(db: IProjectDatabase, pgp: IMain) {
    super(db, pgp, sql);
  }
  listComicsOfAuthor(authorId: number, { limit = 20, offset = 0 }) {
    return this.db.manyOrNone(this.sql.listComicsByAuthor, {
      authorId,
      limit,
      offset,
    });
  }
}
