const clear = require('clear');
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as figlet from 'figlet';
import TableView from '../views/TableView';
import InteractiveTableView, { IListFunctionArgs } from '../views/InteractiveTableView';
import { SelectedComicsModes, selectedComicsPrompts } from './prompts';
import { Comics } from '../db/models';

export async function start(selectedComicsId: string) {
  clear();
  console.log(chalk.cyan(figlet.textSync('Comics', { font: 'Isometric3' })));
  const comics = await Comics.query().findById(selectedComicsId);
  if (comics) {
    while (true) {
      console.log(TableView.buildTable([comics]));
      const answers: any = await inquirer.prompt(selectedComicsPrompts.menu);
      switch (answers.mode) {
        case SelectedComicsModes.UPDATE:
          await update(comics);
          // comics = await Comics.query().findById(selectedComicsId);
          break;
        case SelectedComicsModes.VIEW_ALL_AUTHORS:
          await interactiveListAuthors(comics);
          break;
        case SelectedComicsModes.DELETE:
          if (await deleteSelected(comics)) {
            return;
          }
          break;
        case SelectedComicsModes.BACK:
          return;
      }
    }
  }
  clear();
  console.log('No such comics exists');
}

async function update(comics: Comics) {
  const answers: any = await inquirer.prompt(
      selectedComicsPrompts.getUpdatePrompt(comics)
  );
  await comics.$query().patch(answers);
}

function listAuthors(comics: Comics) {
  return async ({ limit, offset }: IListFunctionArgs) => {
    console.log(
        TableView.buildTable(
            await comics.$relatedQuery('authors')
                .limit(limit)
                .offset(offset)
        )
    );
  };
}

function interactiveListAuthors(comics: Comics) {
  return InteractiveTableView.display(listAuthors(comics), 0, 10);
}

async function deleteSelected(comics: Comics): Promise<boolean> {
  const answers = (await inquirer.prompt(selectedComicsPrompts.delete)) as any;
  if (answers.confirm) {
    await comics.$query().delete();
    return true;
  }
  return false;
}
