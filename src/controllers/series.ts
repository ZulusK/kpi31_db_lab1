const clear = require('clear');
import * as inquirer from 'inquirer';
import { db } from '../db';
import chalk from 'chalk';
import * as figlet from 'figlet';
import InteractiveTableView, {
  IListFunctionArgs,
} from '../views/InteractiveTableView';
import TableView from '../views/TableView';
import { series } from '../utils';
import {
  seriesPrompts,
  SeriesModes,
  randomizeEntitiesPromptItems,
} from './prompts';
import * as selectedSeriesCtrl from './selectedSeries';

export async function start() {
  clear();
  console.log(
    chalk.blueBright(figlet.textSync('Series', { font: 'Isometric3' })),
  );
  while (true) {
    const answers: any = await inquirer.prompt(seriesPrompts.menu);
    switch (answers.mode) {
      case SeriesModes.LIST:
        await interactiveList();
        break;
      case SeriesModes.CREATE:
        await createSeries();
        break;
      case SeriesModes.RANDOMIZE:
        await randomize();
        break;
      case SeriesModes.SELECT:
        await select();
        break;
      case SeriesModes.DROP:
        await drop();
        break;
      case SeriesModes.BACK:
        return;
    }
  }
}

async function createSeries() {
  const answers: any = await inquirer.prompt(seriesPrompts.create);
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
  const answers: any = await inquirer.prompt(randomizeEntitiesPromptItems);
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

async function select() {
  const answers = (await inquirer.prompt(seriesPrompts.selectById)) as any;
  await selectedSeriesCtrl.start(answers.seriesId);
}
