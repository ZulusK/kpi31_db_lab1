const clear = require('clear');
import * as inquirer from 'inquirer';
import { db } from '../db';
import chalk from 'chalk';
import * as figlet from 'figlet';
import InteractiveTableView, {
  IListFunctionArgs,
} from '../views/InteractiveTableView';
import TableView from '../views/TableView';
import { series } from '../test/utils';

enum Modes {
  CREATE = 'create new serie',
  BACK = 'back',
  LIST = 'list series',
  RANDOMIZE = 'fill db with random entities',
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
const createSeriesItems: any = [
  {
    name: 'title',
    type: 'input',
    message: 'Title:',
  },
  {
    name: 'rating',
    type: 'number',
    max: 10,
    min: 1,
    message: 'Rating:',
  },
];
const randomizeSeriesItems: any = [
  {
    name: 'count',
    type: 'number',
    max: 50,
    min: 1,
    message: 'Count:',
  },
];

export async function start() {
  clear();
  console.log(
    chalk.blueBright(figlet.textSync('Series', { font: 'Isometric3' })),
  );
  while (true) {
    const answers: any = await inquirer.prompt(menuItems);
    switch (answers.mode) {
      case Modes.LIST:
        await interactiveList();
        break;
      case Modes.CREATE:
        await createSeries();
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

async function createSeries() {
  const answers: any = await inquirer.prompt(createSeriesItems);
  console.log(TableView.buildTable([await db.series.insertOne(answers)]));
}

async function listSeries({ offset, limit }: IListFunctionArgs) {
  const list = await db.series.list({ offset, limit });
  const total = await db.series.total();
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
  return InteractiveTableView.display(listSeries, 0, 10);
}

async function randomize() {
  const answers: any = await inquirer.prompt(randomizeSeriesItems);
  const seriesRandomData = Array.from(
    { length: answers.count },
    series.randomData,
  );
  console.log(
    TableView.buildTable(await db.series.insertMany(seriesRandomData)),
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
