import * as faker from 'faker';
import { IAuthor } from '../db/models/authors/authors.model';
import { genders } from '../db/types';

export function randomData(): IAuthor {
  return {
    name: faker.name.findName(),
    country: faker.address.country(),
    dob: faker.date.past(),
    gender: faker.random.arrayElement(genders) as any,
  };
}
