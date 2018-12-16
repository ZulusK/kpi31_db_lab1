import { BaseModel } from './BaseModel';
import { Model } from 'objection';

export default class Series extends BaseModel {
  public static tableName = 'series';
  public static idColumn = 'id';

  public static jsonSchema = {
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      isEnded: {
        type: 'boolean'
      },
      title: {
        type: 'string'
      },
      rating: {
        type: 'number'
      }
    }
  };

  public static relationMappings = {
    comics: {
      relation: Model.HasManyRelation,
      join: {
        to: 'series.id',
        from: 'comics.serie_id'
      },
      modelClass: `${ __dirname }/${ 'Comics' }`
    }
  };
  id: number;
  isEnded: boolean;
  title: string;
  rating: number;
}
