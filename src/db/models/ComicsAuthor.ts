import { BaseModel } from './BaseModel';
import { Model } from 'objection';

export default class ComicsAuthor extends BaseModel {
  public static tableName = 'comics_authors';
  public static idColumn = ['comics_id', 'author_id'];

  public static jsonSchema = {
    type: 'object',
    properties: {
      comicsId: {
        type: 'number'
      },
      authorId: {
        type: 'number'
      }
    }
  };

  public static relationMappings = {
    comics: {
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'comics_authors.comics_id',
        to: 'comics.id'
      },
      modelClass: `${ __dirname }/${ 'Comics' }`
    },
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${ __dirname }/${ 'Author' }`,
      join: {
        from: 'comics_authors.author_id',
        to: 'authors.id'
      }
    }
  };
  comicsId: number;
  authorId: number;
}
