import * as inquirer from 'inquirer';
import { db } from '../db';
// import TableView from '../views/TableView';
import chalk from 'chalk';
import * as figlet from 'figlet';
const clear = require('clear');
import TableView from '../views/TableView';

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

const createComicsItems = [
  {
    name: 'title',
    type: 'input',
    message: 'Title of comics',
  },
];

async function createComics() {
  const answers: any = await inquirer.prompt(createComicsItems);
  console.log(TableView.buildTable([await db.comics.insertOne(answers)]));
}
async function listComics() {
  const list = await db.comics.list({ offset: 0, limit: 20 });
  console.log(TableView.buildTable(list));
}
