import * as inquirer from 'inquirer';
import { db } from '../db';
// import TableView from '../views/TableView';
import chalk from 'chalk';
import * as figlet from 'figlet';
const clear = require('clear');
import TableView from '../views/TableView';
import { comicsCategories } from '../db/types';
import * as _ from 'lodash';

enum Modes {
  CREATE = 'create new comics',
  BACK = 'back',
  LIST = 'list comics',
}
const menuItems = [
  {
    name: 'mode',
    type: 'list',
    message: "What's next?",
    choices: [Modes.CREATE, Modes.LIST, Modes.BACK],
    default: 0,
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
      case Modes.LIST:
        await listComics();
        break;
      case Modes.CREATE:
        await createComics();
        break;
      case Modes.BACK:
        return;
    }
  }
}

const createComicsItems: any = [
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
    min: 0,
    message: 'Rating:',
  },
];

async function createComics() {
  const answers: any = await inquirer.prompt(createComicsItems);
  console.log(TableView.buildTable([await db.comics.insertOne(answers)]));
}
async function listComics() {
  const list = await db.comics.list({ offset: 0, limit: 20 });
  const total = await db.comics.total();
  console.log(TableView.buildTable(list));
  console.log(chalk.cyan('Total:'), total);
}
