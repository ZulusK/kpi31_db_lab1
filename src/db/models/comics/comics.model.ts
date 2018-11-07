import { IMain } from 'pg-promise';
import { default as sql, IComicsSqlQueryTree } from './sql';
import { ComicsCategory } from '../../types';
import { BaseModel, IBaseRecord } from '../BaseModel';
import { IProjectDatabase } from '../../index';

export interface IComics extends IBaseRecord {
  title: string;
  publish_date?: Date;
  serie_id?: number;
  category?: ComicsCategory;
  rating?: number;
}

export class ComicsModel extends BaseModel<IComics, IComicsSqlQueryTree> {
  constructor(db: IProjectDatabase, pgp: IMain) {
    super(db, pgp, sql);
  }
  allNames() {
    return this.db.many<{ title: string }>('SELECT title from comics');
  }
  fts(query: string) {
    return this.db.manyOrNone(this.sql.fullTextSearch, [query]);
  }
  searchById(id: string) {
    return this.db.manyOrNone(this.sql.searchById, { id });
  }
  updateById(targetId: number, newData: IComics) {
    return this.db.oneOrNone(this.sql.updateById, { targetId, ...newData });
  }
  listBySeries(
    seriesId: number,
    { offset, limit }: { offset: number; limit: number },
  ) {
    return this.db.manyOrNone(this.sql.listBySeries, {
      seriesId,
      offset,
      limit,
    });
  }
}
