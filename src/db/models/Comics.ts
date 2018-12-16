import { BaseModel } from './BaseModel';
import { ComicsCategory } from '../types';
import { Model } from 'objection';

export default class Comics extends BaseModel {
  public static tableName = 'comics';
  public static idColumn = 'id';

  public static jsonSchema = {
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      publishDate: {
        type: 'date'
      },
      title: {
        type: 'string'
      },
      category: {
        type: 'string'
      },
      serieId: {
        type: ['null', 'number']
      },
      rating: {
        type: 'number'
      }
    }
  };
  public static relationMappings = {
    series: {
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'comics.serie_id',
        to: 'series.id'
      },
      modelClass: `${ __dirname }/${ 'Series' }`
    },
    authors: {
      relation: Model.ManyToManyRelation,
      modelClass: `${ __dirname }/${ 'Author' }`,
      join: {
        from: 'comics.id',
        through: {
          from: 'comics_authors.comics_id',
          modelClass: `${ __dirname }/${ 'ComicsAuthor' }`,
          to: 'comics_authors.author_id'
        },
        to: 'authors.id'
      }
    }
  };
  id: number;
  publishDate: Date;
  title: string;
  category: ComicsCategory;
  serieId: number;
  rating: number;
}
