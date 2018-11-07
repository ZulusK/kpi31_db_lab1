import { IMain } from 'pg-promise';
import { default as sql, ISeriesSqlQueryTree } from './sql';
import { BaseModel, IBaseRecord } from '../BaseModel';
import { IProjectDatabase } from '../../index';

export interface ISeries extends IBaseRecord {
  title: string;
  rating: number;
  isEnded: boolean;
  is_ended?: boolean;
}
export class SeriesModel extends BaseModel<ISeries, ISeriesSqlQueryTree> {
  constructor(db: IProjectDatabase, pgp: IMain) {
    super(db, pgp, sql);
  }

  searchById(id: string) {
    return this.db.manyOrNone(this.sql.searchById, { id });
  }

  updateById(targetId: any, newData: ISeries) {
    return this.db.oneOrNone(this.sql.updateById, { targetId, ...newData });
  }
}
