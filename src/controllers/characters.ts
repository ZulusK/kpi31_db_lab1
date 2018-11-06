const clear = require('clear');
import * as inquirer from 'inquirer';
import { db } from '../db';
import chalk from 'chalk';
import * as figlet from 'figlet';
import InteractiveTableView, {
  IListFunctionArgs,
} from '../views/InteractiveTableView';
import TableView from '../views/TableView';
import { characters } from '../utils';
import {
  CharactersModes,
  randomizeEntitiesPromptItems,
  charactersPrompts,
} from './prompts';

export async function start() {
  clear();
  console.log(
    chalk.magentaBright(figlet.textSync('Characters', { font: 'Isometric3' })),
  );
  while (true) {
    const answers: any = await inquirer.prompt(charactersPrompts.menu);
    switch (answers.mode) {
      case CharactersModes.LIST:
        await interactiveList();
        break;
      case CharactersModes.CREATE:
        await createCharacter();
        break;
      case CharactersModes.RANDOMIZE:
        await randomize();
        break;
      case CharactersModes.DROP:
        await drop();
        break;
      case CharactersModes.BACK:
        return;
    }
  }
}

async function createCharacter() {
  const answers: any = await inquirer.prompt(charactersPrompts.create);
  console.log(TableView.buildTable([await db.characters.insertOne(answers)]));
}

async function listCharacters({ offset, limit }: IListFunctionArgs) {
  const list = await db.characters.list({ offset, limit });
  const total = await db.characters.total();
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
  return InteractiveTableView.display(listCharacters, 0, 10);
}

async function randomize() {
  const answers: any = await inquirer.prompt(randomizeEntitiesPromptItems);
  const charactersRandomData = Array.from(
    { length: answers.count },
    characters.randomData,
  );
  console.log(
    TableView.buildTable(await db.characters.insertMany(charactersRandomData)),
  );
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
