const clear = require('clear');
import * as inquirer from 'inquirer';
import { db } from '../db';
import chalk from 'chalk';
import * as figlet from 'figlet';
import InteractiveTableView, {
  IListFunctionArgs,
} from '../views/InteractiveTableView';
import TableView from '../views/TableView';
import { authors } from '../utils';
import * as _ from 'lodash';
import * as selectedAuthorCtrl from './selectedAuthor';
import {
  authorsPrompts,
  AuthorsModes,
  randomizeEntitiesPromptItems,
} from './prompts';
export async function start() {
  clear();
  console.log(chalk.cyan(figlet.textSync('Authors', { font: 'Isometric3' })));
  while (true) {
    const answers: any = await inquirer.prompt(authorsPrompts.menu);
    switch (answers.mode) {
      case AuthorsModes.LIST:
        await interactiveList();
        break;
      case AuthorsModes.CREATE:
        await create();
        break;
      case AuthorsModes.RANDOMIZE:
        await randomize();
        break;
      case AuthorsModes.DROP:
        await drop();
        break;
      case AuthorsModes.SELECT:
        await select();
        break;
      case AuthorsModes.BACK:
        return;
    }
  }
}

async function create() {
  const answers: any = await inquirer.prompt(authorsPrompts.create);
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

async function select() {
  const answers = (await inquirer.prompt(authorsPrompts.selectById)) as any;
  await selectedAuthorCtrl.start(answers.authorId);
}
