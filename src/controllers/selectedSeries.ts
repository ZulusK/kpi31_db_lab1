const clear = require('clear');
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as figlet from 'figlet';
import * as _ from 'lodash';
import { db } from '../db';
import TableView from '../views/TableView';
import InteractiveTableView, {
  IListFunctionArgs,
} from '../views/InteractiveTableView';
import { selectedSeriesPrompts, SelectedSeriesModes } from './prompts';
import { ISeries } from '../db/models/series/series.model';

export async function start(selectedSeriesId: string) {
  clear();
  console.log(chalk.cyan(figlet.textSync('Series', { font: 'Isometric3' })));
  let series = await db.series.findById(selectedSeriesId);
  while (true) {
    const answers: any = await inquirer.prompt(selectedSeriesPrompts.menu);
    switch (answers.mode) {
      case SelectedSeriesModes.UPDATE:
        await update(series);
        series = await db.series.findById(selectedSeriesId);
        break;
      case SelectedSeriesModes.VIEW_ALL_COMICS:
        await interactiveListComics(series);
        break;
      case SelectedSeriesModes.BACK:
        return;
    }
  }
}
async function update(series: ISeries) {
  const answers: any = await inquirer.prompt(
    selectedSeriesPrompts.getUpdatePrompt(series),
  );
  await db.series.updateById(series.id, answers);
}

function listComics(series: ISeries) {
  return async ({ limit, offset }: IListFunctionArgs) => {
    console.log(
      TableView.buildTable(
        await db.comics.listBySeries(series.id || 0, {
          limit,
          offset,
        }),
      ),
    );
  };
}

function interactiveListComics(series: ISeries) {
  return InteractiveTableView.display(listComics(series), 0, 10);
}
