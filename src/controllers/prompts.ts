import { genders, comicsCategories } from '../db/types';
import { filterCountries } from '../utils/countries';
import { Comics, Author, Series } from '../db/models';
import { prompts } from '../config';
import { ref } from 'objection';

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
  DELETE_COMICS = 'delete comics',
  VIEW_ALL_COMICS = 'view comics of author',
  DELETE = 'delete this author',
  BACK = '<-',
}

export enum SelectedSeriesModes {
  UPDATE = 'update',
  VIEW_ALL_COMICS = 'view comics in series',
  DELETE = 'delete this series',
  BACK = '<-',
}

export enum SelectedComicsModes {
  UPDATE = 'update',
  VIEW_ALL_AUTHORS = 'view authors of comics',
  DELETE = 'delete this comics',
  BACK = '<-',
}

export enum ComicsModes {
  CREATE = 'Create new',
  BACK = '<-',
  LIST = 'List all comics',
  RANDOMIZE = 'Fill db with random data',
  SEARCH = 'FTS by phrase',
  BACK_SEARCH = 'FTS by absence word',
  SELECT = 'Select one comics',
  ADVANCED_SEARCH = 'Custom search',
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
    message: 'What\'s next?',
    choices: [
      MenuModes.OPERATIONS_WITH_COMICS,
      MenuModes.OPERATIONS_WITH_SERIES,
      // MenuModes.OPERATIONS_WITH_CHARACTERS,
      MenuModes.OPERATIONS_WITH_AUTHORS,
      MenuModes.EXIT
    ],
    default: 0
  }
};
export const authorsPrompts = {
  menu: [
    {
      name: 'mode',
      type: 'list',
      message: 'What\'s next?',
      choices: [
        AuthorsModes.CREATE,
        AuthorsModes.LIST,
        AuthorsModes.RANDOMIZE,
        AuthorsModes.DROP,
        AuthorsModes.SELECT,
        AuthorsModes.BACK
      ],
      default: 0
    }
  ],
  create: [
    {
      name: 'name',
      type: 'input',
      message: 'Name:',
      default: 'Stan Lee'
    },
    {
      name: 'gender',
      type: 'list',
      message: 'Gender:',
      choices: genders,
      default: 'male'
    },
    {
      name: 'country',
      type: 'autocomplete',
      source: (__: any, input: string) => {
        return Promise.resolve(filterCountries(input));
      },
      message: 'Country:',
      default: 'USA'
    },
    {
      name: 'dob',
      type: 'datetime',
      message: 'Date of birth:',
      format: ['d', '/', 'm', '/', 'yyyy'],
      initial: new Date('1950-01-01')
    }
  ],
  selectById: [
    {
      filter: (input: string) => (input ? +input.split('/')[0] : ''),
      name: 'authorId',
      type: 'autocomplete',
      source: async (__: any, input: string) => {
        if (input && input.length > 0) {
          const rows = await Promise.resolve(
              Author.query()
                  .where(ref('Authors.id').castText(), 'like', `%${ input || '' }%`));
          return rows.map((row: Author) => ({
            value: `${ row.id }/${ row.name }`
          }));
        }
        return [];
      },
      message: 'Id of author:'
    }
  ]
};
export const seriesPrompts = {
  menu: [
    {
      name: 'mode',
      type: 'list',
      message: 'What\'s next?',
      choices: [
        SeriesModes.CREATE,
        SeriesModes.LIST,
        SeriesModes.RANDOMIZE,
        SeriesModes.DROP,
        SeriesModes.SELECT,
        SeriesModes.BACK
      ],
      default: 0
    }
  ],
  create: [
    {
      name: 'title',
      type: 'input',
      message: 'Title:'
    },
    {
      name: 'rating',
      type: 'number',
      max: 10,
      min: 1,
      message: 'Rating:'
    },
    {
      filter: (input: string) => input === 'yes',
      name: 'isEnded',
      type: 'list',
      message: 'Is series ended:',
      choices: ['yes', 'no']
    }
  ],
  selectById: [
    {
      filter: (input: string) => (input ? +input.split('/')[0] : ''),
      name: 'serieId',
      type: 'autocomplete',
      source: async (__: any, input: string) => {
        if (input && input.length > 0) {
          const rows = await Promise.resolve(
              Series.query()
                  .where(ref('Series.id').castText(), 'like', `%${ input || '' }%`));
          return rows.map((row: Series) => ({
            value: `${ row.id }/${ row.title }`
          }));
        }
        return [];
      },
      message: 'Id of series:'
    }
  ]
};
export const comicsPrompts = {
  selectById: [
    {
      filter: (input: string) => (input ? +input.split('/')[0] : ''),
      name: 'comicsId',
      type: 'autocomplete',
      source: async (__: any, input: string) => {
        if (input && input.length > 0) {
          const rows = await Promise.resolve(
              Comics.query()
                  .where(ref('Comics.id').castText(), 'like', `%${ input || '' }%`));
          return rows.map((row: Comics) => ({
            value: `${ row.id }/${ row.title }`
          }));
        }
        return [];
      },
      message: 'Id of comics:'
    }
  ],
  menu: [
    {
      name: 'mode',
      type: 'list',
      message: 'What\'s next?',
      choices: [
        ComicsModes.CREATE,
        ComicsModes.SEARCH,
        ComicsModes.BACK_SEARCH,
        ComicsModes.LIST,
        ComicsModes.RANDOMIZE,
        ComicsModes.DROP,
        ComicsModes.SELECT,
        ComicsModes.ADVANCED_SEARCH,
        ComicsModes.BACK
      ],
      default: 0
    }
  ],
  create: [
    {
      name: 'title',
      type: 'input',
      message: 'Title:'
    },
    {
      name: 'category',
      type: 'list',
      message: 'Category:',
      choices: comicsCategories
    },
    {
      name: 'rating',
      type: 'number',
      max: 10,
      min: 1,
      message: 'Rating:'
    },
    {
      filter: (input: string) => {
        if (input === prompts.emptyPromptAutocomplete) {
          return null;
        }
        return input ? +input.split('/')[0] : null;
      },
      name: 'serieId',
      type: 'autocomplete',
      source: async (__: any, input: string) => {
        if (input && input.length > 0) {
          const rows = await Promise.resolve(Series.query().where({ id: input }));
          return rows.map((row: Series) => ({
            value: `${ row.id }/${ row.title }`
          }));
        }
        return [prompts.emptyPromptAutocomplete];
      },
      message: 'Id of series:'
    },
    {
      name: 'publishDate',
      type: 'datetime',
      message: 'Publish date:',
      format: ['d', '/', 'm', '/', 'yyyy'],
      initial: new Date('1950-01-01')
    }
  ],
  advancedSearch: [
    {
      name: 'category',
      type: 'list',
      message: 'Category:',
      choices: comicsCategories
    },
    {
      filter: (input: string) => input === 'yes',
      name: 'isEnded',
      type: 'list',
      message: 'Is series ended:',
      choices: ['yes', 'no']
    }
  ],
  search: [
    {
      name: 'query',
      type: 'input',
      message: 'What are you looking for?'
    }
  ]
};
export const charactersPrompts = {
  menu: [
    {
      name: 'mode',
      type: 'list',
      message: 'What\'s next?',
      choices: [
        CharactersModes.CREATE,
        CharactersModes.LIST,
        CharactersModes.RANDOMIZE,
        CharactersModes.DROP,
        CharactersModes.BACK
      ],
      default: 0
    }
  ],
  create: [
    {
      name: 'nickname',
      type: 'input',
      message: 'Nickname:',
      default: 'Batman'
    },
    {
      name: 'name',
      type: 'input',
      message: 'Name:',
      default: 'Bruce Wayne'
    },
    {
      name: 'gender',
      type: 'list',
      message: 'Gender:',
      choices: genders,
      default: 'male'
    },
    {
      name: 'skills',
      type: 'input',
      message: 'Skills (in one line):'
    },
    {
      name: 'is_hero',
      type: 'confirm',
      message: 'Is hero?'
    },
    {
      name: 'dob',
      type: 'datetime',
      message: 'Date of birth:',
      format: ['d', '/', 'm', '/', 'yyyy']
    }
  ]
};
export const selectedAuthorPrompts = {
  menu: [
    {
      name: 'mode',
      type: 'list',
      message: 'What\'s next?',
      choices: [
        SelectedAuthorModes.UPDATE,
        SelectedAuthorModes.ADD_COMICS,
        SelectedAuthorModes.DELETE_COMICS,
        SelectedAuthorModes.VIEW_ALL_COMICS,
        SelectedAuthorModes.DELETE,
        SelectedAuthorModes.BACK
      ],
      default: 0
    }
  ],
  delete: [
    {
      name: 'confirm',
      type: 'confirm',
      message: 'Are you sure?'
    }
  ],
  getUpdatePrompt: (author: Author) => [
    {
      name: 'name',
      type: 'input',
      message: 'Name:',
      default: author.name
    },
    {
      name: 'gender',
      type: 'list',
      message: 'Gender:',
      choices: genders,
      default: author.gender
    },
    {
      name: 'country',
      type: 'autocomplete',
      source: (__: any, input: string) => {
        return Promise.resolve(filterCountries(input));
      },
      message: 'Country:',
      default: author.country
    },
    {
      name: 'dob',
      type: 'datetime',
      message: 'Date of birth:',
      format: ['d', '/', 'm', '/', 'yyyy'],
      default: author.dob,
      initial: author.dob
    }
  ],
  // @ts-ignore
  getDeleteComicsByIdAndAuthor: (author: Author) => [
    {
      filter: (input: string) => (input ? +input.split('/')[0] : ''),
      name: 'comicsId',
      type: 'autocomplete',
      source: async (__: any, input: string) => {
        if (input && input.length > 0) {
          const rows = await author.$relatedQuery('comics')
              .where(ref('Comics.id').castText(), 'like', `%${ input || '' }%`);
          return rows.map((row: any) => ({
            value: `${ row.id }/${ row.title }`
          }));
        }
        return [];
      },
      message: 'Id of comics:'
    },
    {
      name: 'confirm',
      type: 'confirm',
      message: 'Are you sure?'
    }
  ]
};
export const selectedComicsPrompts = {
  menu: [
    {
      name: 'mode',
      type: 'list',
      message: 'What\'s next?',
      choices: [
        SelectedComicsModes.UPDATE,
        SelectedComicsModes.VIEW_ALL_AUTHORS,
        SelectedComicsModes.DELETE,
        SelectedComicsModes.BACK
      ],
      default: 0
    }
  ],
  getUpdatePrompt: (comics: Comics) => [
    {
      name: 'title',
      type: 'input',
      default: comics.title,
      message: 'Title:'
    },
    {
      name: 'category',
      type: 'list',
      message: 'Category:',
      default: comics.category,
      choices: comicsCategories
    },
    {
      name: 'rating',
      type: 'number',
      max: 10,
      min: 1,
      default: comics.rating,
      message: 'Rating:'
    },
    {
      filter: (input: string) => {
        if (input === prompts.emptyPromptAutocomplete) {
          return null;
        }
        return input ? +input.split('/')[0] : null;
      },
      name: 'serieId',
      type: 'autocomplete',
      source: async (__: any, input: string) => {
        if (input && input.length > 0) {
          const rows = await Promise.resolve(Series.query()
              .where(ref('Series.id').castText(), 'like', `%${ input || '' }%`));
          return rows.map((row: Series) => ({
            value: `${ row.id }/${ row.title }`
          }));
        }
        return [prompts.emptyPromptAutocomplete];
      },
      default: comics.serieId,
      message: 'Id of series:'
    },
    {
      name: 'publishDate',
      type: 'datetime',
      message: 'Publish date:',
      format: ['d', '/', 'm', '/', 'yyyy'],
      default: comics.publishDate,
      initial: comics.publishDate
    }
  ],
  delete: [
    {
      name: 'confirm',
      type: 'confirm',
      message: 'Are you sure?'
    }
  ]
};
export const selectedSeriesPrompts = {
  menu: [
    {
      name: 'mode',
      type: 'list',
      message: 'What\'s next?',
      choices: [
        SelectedSeriesModes.UPDATE,
        SelectedSeriesModes.VIEW_ALL_COMICS,
        SelectedSeriesModes.DELETE,
        SelectedSeriesModes.BACK
      ],
      default: 0
    }
  ],
  delete: [
    {
      name: 'confirm',
      type: 'confirm',
      message: 'Are you sure?'
    }
  ],
  getUpdatePrompt: (series: Series) => [
    {
      name: 'title',
      type: 'input',
      default: series.title,
      message: 'Title:'
    },
    {
      name: 'rating',
      type: 'number',
      max: 10,
      min: 1,
      default: series.rating,
      message: 'Rating:'
    },
    {
      filter: (input: string) => input === 'yes',
      name: 'isEnded',
      type: 'list',
      default: series.isEnded,
      message: 'Is series ended:',
      choices: ['yes', 'no']
    }
  ]
};

export const randomizeEntitiesPromptItems: any = [
  {
    name: 'count',
    type: 'number',
    max: 50,
    min: 1,
    default: 1,
    initial: 1,
    message: 'Count:'
  }
];
