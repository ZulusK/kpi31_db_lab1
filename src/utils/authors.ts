import * as faker from 'faker';
import { genders } from '../db/types';

export function randomData(): any {
  return {
    name: faker.name.findName(),
    country: faker.address.country(),
    dob: faker.date.past(),
    gender: faker.random.arrayElement(genders) as any
  };
}
