const clear = require('clear');
import * as inquirer from 'inquirer';
import { db } from '../db';
import chalk from 'chalk';
import * as figlet from 'figlet';
import InteractiveTableView, {
  IListFunctionArgs,
} from '../views/InteractiveTableView';
import TableView from '../views/TableView';
import { comicsCategories } from '../db/types';
import { comics } from '../utils';
import { randomizeEntitiesPromptItems } from '.';

enum Modes {
  CREATE = 'Create new',
  BACK = '<-',
  LIST = 'List all comics',
  RANDOMIZE = 'Fill db with random data',
  SEARCH = 'Search in comics',
  DROP = 'Clean DB',
}

const menuItems = [
  {
    name: 'mode',
    type: 'list',
    message: "What's next?",
    choices: [
      Modes.CREATE,
      Modes.SEARCH,
      Modes.LIST,
      Modes.RANDOMIZE,
      Modes.DROP,
      Modes.BACK,
    ],
    default: 0,
  },
];

const createPromptItems: any = [
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
];

const searchPromptItems: any = [
  {
    name: 'query',
    type: 'input',
    message: 'What are you looking for?',
  },
];

export async function start() {
  clear();
  console.log(
    chalk.redBright(figlet.textSync('Comics', { font: 'Isometric3' })),
  );
  while (true) {
    const answers: any = await inquirer.prompt(menuItems);
    switch (answers.mode) {
      case Modes.SEARCH:
        await search();
        break;
      case Modes.LIST:
        await interactiveList();
        break;
      case Modes.CREATE:
        await createComics();
        break;
      case Modes.RANDOMIZE:
        await randomize();
        break;
      case Modes.DROP:
        await empty();
        break;
      case Modes.BACK:
        return;
    }
  }
}

async function createComics() {
  const answers: any = await inquirer.prompt(createPromptItems);
  console.log(TableView.buildTable([await db.comics.insertOne(answers)]));
}

async function listComics({ offset, limit }: IListFunctionArgs) {
  const list = await db.comics.list({ offset, limit });
  const total = await db.comics.total();
  clear();
  console.log(TableView.buildTable(list));
  console.log(
    chalk.cyan('total:'),
    total,
    chalk.red('limit:'),
    limit,
    chalk.magenta('offset:'),
    offset,
  );
}

function interactiveList() {
  return InteractiveTableView.display(listComics, 0, 10);
}

async function randomize() {
  const answers: any = await inquirer.prompt(randomizeEntitiesPromptItems);
  const comicsRandomData = Array.from(
    { length: answers.count },
    comics.randomData,
  );
  console.log(
    TableView.buildTable(await db.comics.insertMany(comicsRandomData)),
  );
}

async function empty() {
  const answers: any = await inquirer.prompt({
    name: 'confirm',
    type: 'confirm',
  });
  if (answers.confirm) {
    console.log(TableView.buildTable(await db.comics.empty()));
  }
}

async function search() {
  const answers: any = await inquirer.prompt(searchPromptItems);
  console.log(TableView.buildTable(await db.comics.fts(answers.query)));
}
