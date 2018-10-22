import { db } from '../../';
import * as faker from 'faker';
import { EComicsCategory } from '../../types';
import * as _ from 'lodash';

describe('Comics', () => {
  beforeAll(async () => {
    await db.comics.drop();
    await db.comics.create();
  });
  describe('create one', testCreateOne);
});

function testCreateOne() {
  const cases = [
    {
      title:faker.internet.userName(),
    },
    {
      title:faker.hacker.phrase(),
      publish_date:faker.date.past(),
    },
    {
      title:faker.hacker.phrase(),
      publish_date:new Date(),
      category:faker.random.arrayElement(Object.values(EComicsCategory)),
    },
    {
      title:faker.hacker.phrase(),
      publish_date:new Date(),
      category:faker.random.arrayElement(Object.values(EComicsCategory)),
      rating:faker.random.number({ min:0, max:10 }),
    },
  ];
  describe.each(cases)('test creation with %O', (data) => {
    test('create new comics',  async () => {
      const doc = await db.comics.insertOne(data);
      expect(doc).toMatchObject(data);
    },10);
  });
}
