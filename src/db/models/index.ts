import { ComicsModel } from './comics/index';
import { IProjectDatabase } from '..';

// Database Interface Extensions:
export interface IDbRepos {
  comics: ComicsModel;
}
export {
  ComicsModel,
};
export async function init(db:IProjectDatabase) {
  await db.comics.create();
}
