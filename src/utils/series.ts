import * as faker from 'faker';
import { ISeries } from '../db/models/series/series.model';

export function randomData(): ISeries {
  return {
    title: faker.lorem.words(1 + Math.random() * 4),
    rating: faker.random.number({ min: 0, max: 10 }),
  };
}
