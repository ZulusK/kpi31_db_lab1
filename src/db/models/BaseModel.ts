import { IMain, QueryFile } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { IProjectDatabase } from '../index';

export interface IBaseRecord {
  id?: number;
}

export interface IBaseSqlQueryTree {
  create: QueryFile;
  list: QueryFile;
  drop: QueryFile;
  empty: QueryFile;
  add: QueryFile;
  delete: QueryFile;
  findById: QueryFile;
  count: QueryFile;
  all: QueryFile;
}

export class BaseModel<T extends IBaseRecord, S extends IBaseSqlQueryTree> {
  protected db: IProjectDatabase;
  // @ts-ignore
  protected pgp: IMain;
  protected sql: S;

  constructor(db: IProjectDatabase, pgp: IMain, sql: S) {
    this.db = db;
    this.pgp = pgp; // library's root, if ever needed;
    this.sql = sql;
  }

  // Creates the table;
  create() {
    return this.db.none(this.sql.create);
  }

  // Drops the table;
  drop() {
    return this.db.none(this.sql.drop);
  }

  // Removes all records from the table;
  empty() {
    return this.db.none(this.sql.empty);
  }

  // Adds a new entity, and returns the new object;
  insertOne(value: T) {
    return this.db.one(
      this.pgp.as.format(this.sql.add, value, { default: null }),
    );
  }

  insertMany(values: T[]) {
    return this.db.task('insert many comics rows', t =>
      t.batch(
        values.map(value =>
          t.one(this.pgp.as.format(this.sql.add, value, { default: null })),
        ),
      ),
    );
  }

  // Tries to delete a entity by id, and returns the number of records deleted;
  remove(id: number) {
    return this.db.result(this.sql.delete, +id, (r: IResult) => r.rowCount);
  }

  // Tries to find a user from id;
  findById(id: any) {
    return this.db.oneOrNone(this.sql.findById, +id);
  }

  // Returns all user records;
  all() {
    return this.db.any(this.sql.all);
  }

  // Returns the total number of users;
  total() {
    return this.db.one(this.sql.count, [], (a: { count: number }) => +a.count);
  }

  list({ offset = 0, limit = 20 }: { offset: number; limit: number }) {
    return this.db.manyOrNone(this.sql.list, { offset, limit });
  }
}
