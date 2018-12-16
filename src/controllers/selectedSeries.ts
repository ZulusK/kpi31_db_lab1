const clear = require('clear');
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as figlet from 'figlet';
import { Series } from '../db/models';
import TableView from '../views/TableView';
import InteractiveTableView, { IListFunctionArgs } from '../views/InteractiveTableView';
import { selectedSeriesPrompts, SelectedSeriesModes } from './prompts';

export async function start(selectedSeriesId: string) {
  clear();
  console.log(chalk.cyan(figlet.textSync('Series', { font: 'Isometric3' })));
  const series = await Series.query().findById(selectedSeriesId);
  if (series) {
    while (true) {
      console.log(TableView.buildTable([series]));
      const answers: any = await inquirer.prompt(selectedSeriesPrompts.menu);
      switch (answers.mode) {
        case SelectedSeriesModes.UPDATE:
          await update(series);
          break;
        case SelectedSeriesModes.VIEW_ALL_COMICS:
          await interactiveListComics(series);
          break;
        case SelectedSeriesModes.DELETE:
          if (await deleteSelected(series)) {
            return;
          }
          break;
        case SelectedSeriesModes.BACK:
          return;
      }
    }
  } else {
    clear();
    console.log('No such series exists');
  }
}

async function update(series: Series) {
  const answers: any = await inquirer.prompt(
      selectedSeriesPrompts.getUpdatePrompt(series)
  );
  await series.$query().patch(answers);
}

function listComics(series: Series) {
  return async ({ limit, offset }: IListFunctionArgs) => {
    console.log(
        TableView.buildTable(
            await series
                .$relatedQuery('comics')
                .offset(offset)
                .limit(limit)
        )
    );
  };
}

function interactiveListComics(series: Series) {
  return InteractiveTableView.display(listComics(series), 0, 10);
}

async function deleteSelected(series: Series): Promise<boolean> {
  const answers = (await inquirer.prompt(selectedSeriesPrompts.delete)) as any;
  if (answers.confirm) {
    await series.$query().delete();
    return true;
  }
  return false;
}
