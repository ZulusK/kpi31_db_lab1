import { BaseModel } from './BaseModel';
import { CharacterGender } from '../types';

export default class Character extends BaseModel {
  public static tableName = 'characters';
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
      nickname: {
        type: 'string'
      },
      gender: {
        type: 'string'
      },
      skills: {
        type: 'string'
      },
      isHero: {
        type: 'boolean'
      }
    }
  };
  id: number;
  nickname!: string;
  name!: string;
  gender!: CharacterGender;
  skills!: string;
  dob!: Date;
  isHero!: boolean;
}
