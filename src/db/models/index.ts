import { ComicsModel } from './comics/index';
import { SeriesModel } from './series';
import { IProjectDatabase } from '..';

// Database Interface Extensions:
export interface IDbRepos {
  comics: ComicsModel;
  series: SeriesModel;
}
export {
  ComicsModel,
  SeriesModel,
};
export async function init(db:IProjectDatabase) {
  await db.series.create();
  await db.comics.create();
}
