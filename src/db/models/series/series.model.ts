import { IMain } from 'pg-promise';
import { default as sql } from './sql';
import { BaseModel, IBaseRecord } from '../BaseModel';
import { IProjectDatabase } from '../../index';

export interface ISeries extends IBaseRecord {
  title: string;
  rating: number;
}
export class SeriesModel extends BaseModel<ISeries> {
  constructor(db: IProjectDatabase, pgp: IMain) {
    super(db, pgp, sql);
  }
}
