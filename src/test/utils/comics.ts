import * as faker from 'faker';
import { comicsCategories } from '../../db/types';
import { IComics } from '../../db/models/comics/comics.model';
export function randomData(): IComics {
  return {
    title: faker.hacker.phrase(),
    publish_date: new Date(),
    category: faker.random.arrayElement(comicsCategories) as any,
    rating: faker.random.number({ min: 0, max: 10 }),
  };
}
