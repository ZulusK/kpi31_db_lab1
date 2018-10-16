import { IDatabase, IMain } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { default as sql } from './sql';

export class ComicsModel {

  // if you need to access other repositories from here,
  // you will have to replace 'IDatabase<any>' with 'any':
  private db: IDatabase<any>;

  // @ts-ignore
  private pgp: IMain;

  constructor(db: any, pgp: IMain) {
    this.db = db;
    this.pgp = pgp; // library's root, if ever needed;
  }

  // Creates the table;
  create() {
    return this.db.none(sql.create);
  }

  // Drops the table;
  drop() {
    return this.db.none(sql.drop);
  }

  // Removes all records from the table;
  empty() {
    return this.db.none(sql.empty);
  }

  // Adds a new entity, and returns the new object;
  add(name: string) {
    return this.db.one(sql.add, name);
  }

  // Tries to delete a entuty by id, and returns the number of records deleted;
  remove(id: number) {
    return this.db.result(sql.delete, +id, (r: IResult) => r.rowCount);
  }
  // Tries to find a user from id;
  findById(id: number) {
    return this.db.oneOrNone(sql.findById, +id);
  }
  // Returns all user records;
  all() {
    return this.db.any(sql.all);
  }

  // Returns the total number of users;
  total() {
    return this.db.one(sql.count, [], (a: { count:number }) => +a.count);
  }
}
