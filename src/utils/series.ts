import * as faker from 'faker';

export function randomData(): any {
  return {
    title: faker.lorem.words(1 + Math.random() * 4),
    rating: faker.random.number({ min: 0, max: 10 }),
  };
}
