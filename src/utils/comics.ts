import * as faker from 'faker';
import { comicsCategories } from '../db/types';
import * as moment from 'moment';

export function randomData(): any {
  return {
    title: faker.lorem.words(1 + Math.random() * 6),
    publishDate: moment(faker.date.past()).format('MM-DD-YYYY') as any,
    category: faker.random.arrayElement(comicsCategories) as any,
    rating: faker.random.number({ min: 0, max: 10 }),
  };
}
