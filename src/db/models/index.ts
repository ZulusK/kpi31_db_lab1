import { ComicsModel } from './comics/index';
import { SeriesModel } from './series';
import { IProjectDatabase } from '..';
import { CharactersModel } from './character';
import { AuthorsModel } from './authors';

// Database Interface Extensions:
export interface IDbRepos {
  comics: ComicsModel;
  series: SeriesModel;
  characters: CharactersModel;
  authors: AuthorsModel;
}
export { ComicsModel, SeriesModel, CharactersModel, AuthorsModel };
export async function init(db: IProjectDatabase) {
  await db.series.create();
  await db.comics.create();
  await db.characters.create();
  await db.authors.create();
}
