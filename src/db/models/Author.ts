import { BaseModel } from './BaseModel';
import { CharacterGender } from '../types';
import { Model } from 'objection';

export default class Author extends BaseModel {
  public static tableName = 'authors';
  public static idColumn = 'id';

  public static jsonSchema = {
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      dob: {
        type: 'date'
      },
      name: {
        type: 'string'
      },
      gender: {
        type: 'string'
      },
      country: {
        type: 'string'
      }
    }
  };

  public static relationMappings = {
    comics: {
      relation: Model.ManyToManyRelation,
      modelClass: `${ __dirname }/${ 'Comics' }`,
      join: {
        from: 'authors.id',
        through: {
          from: 'comics_authors.author_id',
          modelClass: `${ __dirname }/${ 'ComicsAuthor' }`,
          to: 'comics_authors.comics_id'
        },
        to: 'comics.id'
      }
    }
  };
  id: string;
  name!: string;
  dob!: Date;
  gender: CharacterGender;
  country: string;

}
