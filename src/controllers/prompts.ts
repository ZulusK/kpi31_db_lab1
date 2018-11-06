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
export enum MenuModes {
  OPERATIONS_WITH_COMICS = 'Work with comics',
  OPERATIONS_WITH_SERIES = 'Work with series',
  OPERATIONS_WITH_CHARACTERS = 'Work with characters',
  OPERATIONS_WITH_AUTHORS = 'Work with authors',
  EXIT = 'Exit',
}
export enum SeriesModes {
  CREATE = 'create new',
  BACK = 'back',
  LIST = 'list',
  RANDOMIZE = 'fill db with random data',
  DROP = 'clean DB',
}
export enum SelectedAuthorModes {
  UPDATE = 'update',
  ADD_COMICS = 'add comics',
  VIEW_ALL_COMICS = 'view comics of author',
  BACK = '<-',
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
export enum CharactersModes {
  CREATE = 'create new',
  BACK = 'back',
  LIST = 'list',
  RANDOMIZE = 'fill db with random data',
  DROP = 'clean DB',
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
      initial: new Date('1950-01-01'),
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
  selectById: [
    {
      filter: (input: string) => (input ? input.split('/')[0] : ''),
      name: 'comicsId',
      type: 'autocomplete',
      source: async (__: any, input: string) => {
        if (input && input.length > 0) {
          const rows = await Promise.resolve(db.comics.searchById(input));
          return rows.map(row => ({
            value: `${row.id}/${row.title}`,
          }));
        }
        return [];
      },
      message: 'Id of comics:',
    },
  ],
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
    {
      name: 'publishDate',
      type: 'datetime',
      message: 'Publish date:',
      format: ['d', '/', 'm', '/', 'yyyy'],
      initial: new Date('1950-01-01'),
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
export const charactersPrompts = {
  menu: [
    {
      name: 'mode',
      type: 'list',
      message: "What's next?",
      choices: [
        CharactersModes.CREATE,
        CharactersModes.LIST,
        CharactersModes.RANDOMIZE,
        CharactersModes.DROP,
        CharactersModes.BACK,
      ],
      default: 0,
    },
  ],
  create: [
    {
      name: 'nickname',
      type: 'input',
      message: 'Nickname:',
      default: 'Batman',
    },
    {
      name: 'name',
      type: 'input',
      message: 'Name:',
      default: 'Bruce Wayne',
    },
    {
      name: 'gender',
      type: 'list',
      message: 'Gender:',
      choices: genders,
      default: 'male',
    },
    {
      name: 'skills',
      type: 'input',
      message: 'Skills (in one line):',
    },
    {
      name: 'is_hero',
      type: 'confirm',
      message: 'Is hero?',
    },
    {
      name: 'dob',
      type: 'datetime',
      message: 'Date of birth:',
      format: ['d', '/', 'm', '/', 'yyyy'],
    },
  ],
};
export const selectedAuthorPrompts = {
  menu: [
    {
      name: 'mode',
      type: 'list',
      message: "What's next?",
      choices: [
        SelectedAuthorModes.UPDATE,
        SelectedAuthorModes.ADD_COMICS,
        SelectedAuthorModes.VIEW_ALL_COMICS,
        SelectedAuthorModes.BACK,
      ],
      default: 0,
    },
  ],

  getUpdatePrompt: (author: IAuthor) => [
    {
      name: 'name',
      type: 'input',
      message: 'Name:',
      default: author.name,
    },
    {
      name: 'gender',
      type: 'list',
      message: 'Gender:',
      choices: genders,
      default: author.gender,
    },
    {
      name: 'country',
      type: 'autocomplete',
      source: (__: any, input: string) => {
        return Promise.resolve(filterCountries(input));
      },
      message: 'Country:',
      default: author.country,
    },
    {
      name: 'dob',
      type: 'datetime',
      message: 'Date of birth:',
      format: ['d', '/', 'm', '/', 'yyyy'],
      initial: author.dob,
    },
  ],
};
export const seriesPrompts = {
  menu: [
    {
      name: 'mode',
      type: 'list',
      message: "What's next?",
      choices: [
        SeriesModes.CREATE,
        SeriesModes.LIST,
        SeriesModes.RANDOMIZE,
        SeriesModes.DROP,
        SeriesModes.BACK,
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
      name: 'rating',
      type: 'number',
      max: 10,
      min: 1,
      message: 'Rating:',
    },
  ],
};
export const randomizeEntitiesPromptItems: any = [
  {
    name: 'count',
    type: 'number',
    max: 50,
    min: 1,
    default: 1,
    initial: 1,
    message: 'Count:',
  },
];