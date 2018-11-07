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
import { SelectedComicsModes, selectedComicsPrompts } from './prompts';
import { IComics } from '../db/models/comics/comics.model';

export async function start(selectedComicsId: string) {
  clear();
  console.log(chalk.cyan(figlet.textSync('Comics', { font: 'Isometric3' })));
  let comics = await db.comics.findById(selectedComicsId);
  while (true) {
    console.log(TableView.buildTable([comics]));
    const answers: any = await inquirer.prompt(selectedComicsPrompts.menu);
    switch (answers.mode) {
      case SelectedComicsModes.UPDATE:
        await update(comics);
        comics = await db.comics.findById(selectedComicsId);
        break;
      case SelectedComicsModes.VIEW_ALL_AUTHORS:
        await interactiveListAuthors(comics);
        break;
      case SelectedComicsModes.BACK:
        return;
    }
  }
}
async function update(comics: IComics) {
  const answers: any = await inquirer.prompt(
    selectedComicsPrompts.getUpdatePrompt(comics),
  );
  await db.comics.updateById(comics.id as any, answers);
}

function listAuthors(comics: IComics) {
  return async ({ limit, offset }: IListFunctionArgs) => {
    console.log(
      TableView.buildTable(
        await db.comicsAuthors.listAuthorsOfComics(comics.id || 0, {
          limit,
          offset,
        }),
      ),
    );
  };
}

function interactiveListAuthors(comics: IComics) {
  return InteractiveTableView.display(listAuthors(comics), 0, 10);
}
