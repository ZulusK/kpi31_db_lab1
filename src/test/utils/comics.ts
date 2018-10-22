import * as faker from 'faker';
import { comicsCategories, EComicsCategory } from '../../db/types';
import { IComics } from '../../db/models/comics/comics.model';
export function randomData(): IComics {
  return {
    title: faker.hacker.phrase(),
    publish_date: new Date(),
    category: faker.random.arrayElement<EComicsCategory>(comicsCategories),
    rating: faker.random.number({ min: 0, max: 10 }),
  };
}
