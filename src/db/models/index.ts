import { ComicsModel } from './comics/index';
import { SeriesModel } from './series';
import { IProjectDatabase } from '..';
import { CharactersModel } from './character';

// Database Interface Extensions:
export interface IDbRepos {
  comics: ComicsModel;
  series: SeriesModel;
  characters: CharactersModel;
}
export { ComicsModel, SeriesModel, CharactersModel };
export async function init(db: IProjectDatabase) {
  await db.series.create();
  await db.comics.create();
  await db.characters.create();
}
