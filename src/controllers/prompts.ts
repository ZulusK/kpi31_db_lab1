import { genders, comicsCategories } from '../db/types';
import { filterCountries } from '../utils/countries';
import { db } from '../db';
import { IAuthor } from '../db/models/authors/authors.model';
import { IComics } from '../db/models/comics/comics.model';
import { ISeries } from '../db/models/series/series.model';
import { prompts } from '../config';

/**
 * MODES
 */
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
  CREATE = 'Create new',
  BACK = '<-',
  LIST = 'List',
  RANDOMIZE = 'Fill db with random data',
  SELECT = 'Select one series',
  DROP = 'Clean DB',
}
export enum SelectedAuthorModes {
  UPDATE = 'update',
  ADD_COMICS = 'add comics',
  VIEW_ALL_COMICS = 'view comics of author',
  BACK = '<-',
}
export enum SelectedSeriesModes {
  UPDATE = 'update',
  VIEW_ALL_COMICS = 'view comics in series',
  BACK = '<-',
}
export enum SelectedComicsModes {
  UPDATE = 'update',
  VIEW_ALL_AUTHORS = 'view authors of comics',
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
/**
 * PROMPTS
 */
export const menuPrompts = {
  menu: {
    name: 'mode',
    type: 'list',
    message: "What's next?",
    choices: [
      MenuModes.OPERATIONS_WITH_COMICS,
      MenuModes.OPERATIONS_WITH_SERIES,
      // MenuModes.OPERATIONS_WITH_CHARACTERS,
      MenuModes.OPERATIONS_WITH_AUTHORS,
      MenuModes.EXIT,
    ],
    default: 0,
  },
};
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
      filter: (input: string) => (input ? input.split('/')[0] : ''),
      name: 'authorId',
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
        SeriesModes.SELECT,
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
    {
      filter: (input: string) => input === 'yes',
      name: 'isEnded',
      type: 'list',
      message: 'Is series ended:',
      choices: ['yes', 'no'],
    },
  ],
  selectById: [
    {
      filter: (input: string) => (input ? input.split('/')[0] : ''),
      name: 'seriesId',
      type: 'autocomplete',
      source: async (__: any, input: string) => {
        if (input && input.length > 0) {
          const rows = await Promise.resolve(db.series.searchById(input));
          return rows.map((row: ISeries) => ({
            value: `${row.id}/${row.title}`,
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
        ComicsModes.SELECT,
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
      filter: (input: string) => {
        if (input === prompts.emptyPromptAutocomplete) {
          return null;
        }
        return input ? input.split('/')[0] : null;
      },
      name: 'seriesId',
      type: 'autocomplete',
      source: async (__: any, input: string) => {
        if (input && input.length > 0) {
          const rows = await Promise.resolve(db.series.searchById(input));
          return rows.map((row: ISeries) => ({
            value: `${row.id}/${row.title}`,
          }));
        }
        return [prompts.emptyPromptAutocomplete];
      },
      message: 'Id of series:',
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
      default: author.dob,
      initial: author.dob,
    },
  ],
};
export const selectedComicsPrompts = {
  menu: [
    {
      name: 'mode',
      type: 'list',
      message: "What's next?",
      choices: [
        SelectedComicsModes.UPDATE,
        SelectedComicsModes.VIEW_ALL_AUTHORS,
        SelectedComicsModes.BACK,
      ],
      default: 0,
    },
  ],
  getUpdatePrompt: (comics: IComics) => [
    {
      name: 'title',
      type: 'input',
      default: comics.title,
      message: 'Title:',
    },
    {
      name: 'category',
      type: 'list',
      message: 'Category:',
      default: comics.category,
      choices: comicsCategories,
    },
    {
      name: 'rating',
      type: 'number',
      max: 10,
      min: 1,
      default: comics.rating,
      message: 'Rating:',
    },
    {
      filter: (input: string) => {
        if (input === prompts.emptyPromptAutocomplete) {
          return null;
        }
        return input ? input.split('/')[0] : null;
      },
      name: 'seriesId',
      type: 'autocomplete',
      source: async (__: any, input: string) => {
        if (input && input.length > 0) {
          const rows = await Promise.resolve(db.series.searchById(input));
          return rows.map((row: ISeries) => ({
            value: `${row.id}/${row.title}`,
          }));
        }
        return [prompts.emptyPromptAutocomplete];
      },
      default: comics.serie_id,
      message: 'Id of series:',
    },
    {
      name: 'publishDate',
      type: 'datetime',
      message: 'Publish date:',
      format: ['d', '/', 'm', '/', 'yyyy'],
      default: comics.publish_date,
      initial: comics.publish_date,
    },
  ],
};
export const selectedSeriesPrompts = {
  menu: [
    {
      name: 'mode',
      type: 'list',
      message: "What's next?",
      choices: [
        SelectedSeriesModes.UPDATE,
        SelectedSeriesModes.VIEW_ALL_COMICS,
        SelectedSeriesModes.BACK,
      ],
      default: 0,
    },
  ],
  getUpdatePrompt: (series: ISeries) => [
    {
      name: 'title',
      type: 'input',
      default: series.title,
      message: 'Title:',
    },
    {
      name: 'rating',
      type: 'number',
      max: 10,
      min: 1,
      default: series.rating,
      message: 'Rating:',
    },
    {
      filter: (input: string) => input === 'yes',
      name: 'isEnded',
      type: 'list',
      default: series.is_ended,
      message: 'Is series ended:',
      choices: ['yes', 'no'],
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
