import { db } from '../../';

describe('Comics', () => {
  beforeAll(async () => {
    await db.comics.drop();
    await db.comics.create();
  });
  describe('create one', testCreateOne);
});

function testCreateOne() {
  test('create new comics',  async () => {
    const title = 'Amazing Spider man';
    const doc = await db.comics.add({
      title,
    });
    expect(doc).toHaveProperty('title', title);
  });
}
