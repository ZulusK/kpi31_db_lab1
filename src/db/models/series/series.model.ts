import {  IMain } from 'pg-promise';
import { default as sql } from './sql';
import { EComicsCategory } from '../../types';
import { BaseModel, IBaseRecord } from '../BaseModel';
import { IProjectDatabase } from '../../index';

export interface ISerie extends IBaseRecord{
  title:string;
  publish_date:Date;
  genre:EComicsCategory;
}
export class SeriesModel extends BaseModel<ISerie>{
  constructor(db: IProjectDatabase, pgp: IMain) {
    super(db, pgp, sql);
  }
}
