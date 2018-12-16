const clear = require('clear');
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as figlet from 'figlet';
import InteractiveTableView, { IListFunctionArgs } from '../views/InteractiveTableView';
import TableView from '../views/TableView';
import { authors } from '../utils';
import * as selectedAuthorCtrl from './selectedAuthor';
import { Author } from '../db';
import {
  authorsPrompts,
  AuthorsModes,
  randomizeEntitiesPromptItems
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
  const author = await Author.query().insertAndFetch(answers);
  console.log(TableView.buildTable([author]));
}

async function listAuthors({ offset, limit }: IListFunctionArgs) {
  const list = await Author.query().limit(limit).offset(offset);
  const total = await Author.query().count();
  clear();
  console.log(TableView.buildTable(list));
  console.log(
      chalk.cyan('total:'),
      total,
      chalk.red('limit:'),
      limit,
      chalk.magenta('offset:'),
      offset
  );
}

function interactiveList() {
  return InteractiveTableView.display(listAuthors, 0, 10);
}

async function randomize() {
  const answers: any = await inquirer.prompt(randomizeEntitiesPromptItems);
  const randomData = Array.from({ length: answers.count }, authors.randomData);
  console.log(TableView.buildTable(await Author.query().insertAndFetch(randomData)));
}

async function drop() {
  const answers: any = await inquirer.prompt({
    name: 'confirm',
    type: 'confirm'
  });
  if (answers.confirm) {
    console.log(TableView.buildTable(await Author.query().delete()));
  }
}

async function select() {
  const answers = await inquirer.prompt(authorsPrompts.selectById) as any;
  await selectedAuthorCtrl.start(answers.authorId);
}
