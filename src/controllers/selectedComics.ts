const clear = require('clear');
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as figlet from 'figlet';
import * as _ from 'lodash';
import { db } from '../db';
import { IAuthor } from '../db/models/authors/authors.model';
import { genders } from '../db/types';
import { filterCountries } from '../utils/countries';
import TableView from '../views/TableView';
import InteractiveTableView, {
  IListFunctionArgs,
} from '../views/InteractiveTableView';

enum Modes {
  UPDATE = 'update',
  ADD_COMICS = 'add comics',
  VIEW_ALL_COMICS = 'view comics of author',
  BACK = '<-',
}

const menuItems = [
  {
    name: 'mode',
    type: 'list',
    message: "What's next?",
    choices: [
      Modes.UPDATE,
      Modes.ADD_COMICS,
      Modes.VIEW_ALL_COMICS,
      Modes.BACK,
    ],
    default: 0,
  },
];

const selectComicsPrompt = [
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
];

const getUpdatePrompt = (author: IAuthor) => [
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
];

export async function start(selectedAuthorId: string) {
  clear();
  console.log(chalk.cyan(figlet.textSync('Author', { font: 'Isometric3' })));
  let author = await db.authors.findById(selectedAuthorId);
  while (true) {
    const answers: any = await inquirer.prompt(menuItems);
    switch (answers.mode) {
      case Modes.UPDATE:
        await update(author);
        author = await db.authors.findById(selectedAuthorId);
        break;
      case Modes.ADD_COMICS:
        await addComics(author);
        break;
      case Modes.VIEW_ALL_COMICS:
        await interactiveListComics(author);
        break;
      case Modes.BACK:
        return;
    }
  }
}
async function update(author: IAuthor) {
  const answers: any = await inquirer.prompt(getUpdatePrompt(author));
  await db.authors.updateById(author.id, answers);
}
async function addComics(author: IAuthor) {
  const answers: any = await inquirer.prompt(selectComicsPrompt);
  await db.comicsAuthors.insertOne({
    comicsId: +answers.comicsId,
    authorId: +(author.id as any),
  });
}

function listComics(author: IAuthor) {
  return async ({ limit, offset }: IListFunctionArgs) => {
    console.log(
      TableView.buildTable(
        await db.comicsAuthors.listComicsOfAuthor(author.id || 0, {
          limit,
          offset,
        }),
      ),
    );
  };
}

function interactiveListComics(author: IAuthor) {
  return InteractiveTableView.display(listComics(author), 0, 10);
}
