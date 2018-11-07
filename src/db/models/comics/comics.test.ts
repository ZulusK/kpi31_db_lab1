import { db } from '../../';
import * as faker from 'faker';
import { comicsCategories } from '../../types';
import * as _ from 'lodash';
import * as utils from '../../../utils';
describe('Comics', () => {
  beforeAll(async () => {
    await db.comics.drop();
    await db.comics.create();
  });
  describe('create one', testCreateOne);
  describe('create many', testCreateMany);
});

function testCreateMany() {
  const COUNT_OF_DOCS = 5;
  test(`create new ${COUNT_OF_DOCS} comics`, async () => {
    const data = Array.from({ length: COUNT_OF_DOCS }, utils.comics.randomData);
    const docs = await db.comics.insertMany(data);
    expect(docs).toHaveLength(COUNT_OF_DOCS);
  });
}

function testCreateOne() {
  const cases = [
    {
      title: faker.internet.userName(),
    },
    {
      title: faker.hacker.phrase(),
      publish_date: faker.date.past(),
    },
    {
      title: faker.hacker.phrase(),
      publish_date: new Date(),
      category: faker.random.arrayElement(comicsCategories),
    },
    {
      title: faker.hacker.phrase(),
      publish_date: new Date(),
      category: faker.random.arrayElement(comicsCategories),
      rating: faker.random.number({ min: 0, max: 10 }),
    },
  ];
  describe.each(cases)('test creation with %O', data => {
    test('create new comics', async () => {
      const doc = await db.comics.insertOne(data);
      expect(doc).toMatchObject(data);
    });
  });
}
