import { ComicsModel } from './comics/index';
import { SeriesModel } from './series';
import { IProjectDatabase } from '..';
import { CharactersModel } from './character';
import { AuthorsModel } from './authors';
import { ComicsAuthorsModel } from './comicsAuthors';

// Database Interface Extensions:
export interface IDbRepos {
  comics: ComicsModel;
  series: SeriesModel;
  characters: CharactersModel;
  authors: AuthorsModel;
  comicsAuthors: ComicsAuthorsModel;
}
export {
  ComicsModel,
  SeriesModel,
  CharactersModel,
  AuthorsModel,
  ComicsAuthorsModel,
};
export async function init(db: IProjectDatabase) {
  await db.series.create();
  await db.comics.create();
  await db.characters.create();
  await db.authors.create();
  await db.comicsAuthors.create();
}
