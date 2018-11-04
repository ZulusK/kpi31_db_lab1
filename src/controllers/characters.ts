const clear = require('clear');
import * as inquirer from 'inquirer';
import { db } from '../db';
import chalk from 'chalk';
import * as figlet from 'figlet';
import InteractiveTableView, {
  IListFunctionArgs,
} from '../views/InteractiveTableView';
import TableView from '../views/TableView';
import { charactersGenders } from '../db/types';
import { randomizeEntitiesPromptItems } from '.';
import { characters } from '../utils';
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
const createCharacterItems: any = [
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
    choices: charactersGenders,
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
];

export async function start() {
  clear();
  console.log(
    chalk.magentaBright(figlet.textSync('Characters', { font: 'Isometric3' })),
  );
  while (true) {
    const answers: any = await inquirer.prompt(menuItems);
    switch (answers.mode) {
      case Modes.LIST:
        await interactiveList();
        break;
      case Modes.CREATE:
        await createCharacter();
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

async function createCharacter() {
  const answers: any = await inquirer.prompt(createCharacterItems);
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
