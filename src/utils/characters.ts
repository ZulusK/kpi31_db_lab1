import * as faker from 'faker';
import { charactersGenders } from '../db/types';
import { ICharacter } from '../db/models/character/characters.model';

const superPrefix = [
  'Super',
  'Amazing',
  'Iron',
  'Invisible',
  'Incredible',
  'Powerful',
  'Danger',
  'Fast',
  'Dr.',
  'Magic',
  'Dark',
];
const skills = [
  'speed',
  'power',
  'laser',
  'endles health',
  'magic',
  'animal',
  'techhologies',
  'money',
  'charisma',
  'knowlenges',
  'impenetrable',
  'timetravel',
  'humor',
  'acrobat',
];
export function randomData(): ICharacter {
  return {
    nickname: `${faker.random.arrayElement(
      superPrefix,
    )} ${faker.internet.userName()}`,
    name: `${faker.name.findName()}`,
    skills: Array.from(
      {
        length: faker.random.number({ min: 1, max: 10 }),
      },
      () => faker.random.arrayElement(skills),
    ).join(', '),
    dob: faker.date.past(),
    is_hero: faker.random.boolean(),
    gender: faker.random.arrayElement(charactersGenders) as any,
  };
}
