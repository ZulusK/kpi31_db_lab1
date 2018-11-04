import * as faker from 'faker';
import { comicsCategories } from '../db/types';
import { IComics } from '../db/models/comics/comics.model';

export function randomData(): IComics {
  return {
    title: faker.lorem.words(1 + Math.random() * 6),
    publish_date: faker.date.past(),
    category: faker.random.arrayElement(comicsCategories) as any,
    rating: faker.random.number({ min: 0, max: 10 }),
  };
}