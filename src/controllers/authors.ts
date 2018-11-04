const clear = require('clear');
const countryList = require('country-list')();
import * as inquirer from 'inquirer';
import { db } from '../db';
import chalk from 'chalk';
import * as figlet from 'figlet';
import InteractiveTableView, {
  IListFunctionArgs,
} from '../views/InteractiveTableView';
import TableView from '../views/TableView';
import { genders } from '../db/types';
import { randomizeEntitiesPromptItems } from '.';
import { authors } from '../utils';
import * as _ from 'lodash';

const countries = countryList.getData();

const filterFunc = _.flow([
  regexp =>
    _.filter(countries, ({ code, name }) => {
      return regexp.test(code) || regexp.test(name);
    }),
  filtered => _.map(filtered, ({ name }) => name),
]);

function filterCountries(input: string) {
  if (input && input.length > 0) {
    const regexp = new RegExp(`.*${input}.*`, 'i');
    return filterFunc(regexp);
  }
  return countries;
}

enum Modes {
  CREATE = 'create new',
  BACK = 'back',
  LIST = 'list',
  RANDOMIZE = 'fill db with random data',
  DROP = 'clean DB',
}

const menuItems = [
  {
    name: 'mode',
    type: 'list',
    message: "What's next?",
    choices: [
      Modes.CREATE,
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
];

export async function start() {
  clear();
  console.log(chalk.cyan(figlet.textSync('Authors', { font: 'Isometric3' })));
  while (true) {
    const answers: any = await inquirer.prompt(menuItems);
    switch (answers.mode) {
      case Modes.LIST:
        await interactiveList();
        break;
      case Modes.CREATE:
        await create();
        break;
      case Modes.RANDOMIZE:
        await randomize();
        break;
      case Modes.DROP:
        await drop();
        break;
      case Modes.BACK:
        return;
    }
  }
}

async function create() {
  const answers: any = await inquirer.prompt(createPromptItems);
  console.log(TableView.buildTable([await db.authors.insertOne(answers)]));
}

async function listAuthors({ offset, limit }: IListFunctionArgs) {
  const list = await db.authors.list({ offset, limit });
  const total = await db.authors.total();
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
  return InteractiveTableView.display(listAuthors, 0, 10);
}

async function randomize() {
  const answers: any = await inquirer.prompt(randomizeEntitiesPromptItems);
  const randomData = Array.from({ length: answers.count }, authors.randomData);
  console.log(TableView.buildTable(await db.authors.insertMany(randomData)));
}

async function drop() {
  const answers: any = await inquirer.prompt({
    name: 'confirm',
    type: 'confirm',
  });
  if (answers.confirm) {
    console.log(TableView.buildTable(await db.comics.empty()));
  }
}