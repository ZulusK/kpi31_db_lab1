import { genders, comicsCategories } from '../db/types';
import { filterCountries } from '../utils/countries';
import { db } from '../db';
import { IAuthor } from '../db/models/authors/authors.model';

export enum AuthorsModes {
  CREATE = 'Create new',
  BACK = '<-',
  LIST = 'List',
  RANDOMIZE = 'Fill db with random data',
  SELECT = 'Select one author',
  DROP = 'Clean DB',
}

export enum ComicsModes {
  CREATE = 'Create new',
  BACK = '<-',
  LIST = 'List all comics',
  RANDOMIZE = 'Fill db with random data',
  SEARCH = 'Search in comics',
  SELECT = 'Select one comics',
  DROP = 'Clean DB',
}

export const authorsPrompts = {
  menu: [
    {
      name: 'mode',
      type: 'list',
      message: "What's next?",
      choices: [
        AuthorsModes.CREATE,
        AuthorsModes.LIST,
        AuthorsModes.RANDOMIZE,
        AuthorsModes.DROP,
        AuthorsModes.SELECT,
        AuthorsModes.BACK,
      ],
      default: 0,
    },
  ],
  create: [
    {
      name: 'name',
      type: 'input',
      message: 'Name:',
      default: 'Stan Lee',
    },
    {
      name: 'gender',
      type: 'list',
      message: 'Gender:',
      choices: genders,
      default: 'male',
    },
    {
      name: 'country',
      type: 'autocomplete',
      source: (__: any, input: string) => {
        return Promise.resolve(filterCountries(input));
      },
      message: 'Country:',
      default: 'USA',
    },
    {
      name: 'dob',
      type: 'datetime',
      message: 'Date of birth:',
      format: ['d', '/', 'm', '/', 'yyyy'],
      initial: new Date('1950-01-01 12:30'),
    },
  ],
  selectById: [
    {
      name: 'row',
      type: 'autocomplete',
      source: async (__: any, input: string) => {
        if (input && input.length > 0) {
          const rows = await Promise.resolve(db.authors.searchById(input));
          return rows.map((row: IAuthor) => ({
            value: `${row.id}/${row.name}`,
          }));
        }
        return [];
      },
      message: 'Id of author:',
    },
  ],
};
export const comicsPrompts = {
  menu: [
    {
      name: 'mode',
      type: 'list',
      message: "What's next?",
      choices: [
        ComicsModes.CREATE,
        ComicsModes.SEARCH,
        ComicsModes.LIST,
        ComicsModes.RANDOMIZE,
        ComicsModes.DROP,
        ComicsModes.BACK,
      ],
      default: 0,
    },
  ],
  create: [
    {
      name: 'title',
      type: 'input',
      message: 'Title:',
    },
    {
      name: 'category',
      type: 'list',
      message: 'Category:',
      choices: comicsCategories,
    },
    {
      name: 'rating',
      type: 'number',
      max: 10,
      min: 1,
      message: 'Rating:',
    },
  ],
  search: [
    {
      name: 'query',
      type: 'input',
      message: 'What are you looking for?',
    },
  ],
  select: [
    {
      name: 'row',
      type: 'autocomplete',
      source: async (__: any, input: string) => {
        if (input && input.length > 0) {
          const rows = await Promise.resolve(db.authors.searchById(input));
          return rows.map(row => ({
            value: `${row.id}/${row.name}`,
          }));
        }
        return [];
      },
      message: 'Id of author:',
    },
  ],
};
