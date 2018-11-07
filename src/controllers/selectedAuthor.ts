const clear = require('clear');
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as figlet from 'figlet';
import * as _ from 'lodash';
import { db } from '../db';
import { IAuthor } from '../db/models/authors/authors.model';
import TableView from '../views/TableView';
import InteractiveTableView, {
  IListFunctionArgs,
} from '../views/InteractiveTableView';
import {
  SelectedAuthorModes,
  selectedAuthorPrompts,
  comicsPrompts,
} from './prompts';

export async function start(selectedAuthorId: string) {
  clear();
  console.log(chalk.cyan(figlet.textSync('Author', { font: 'Isometric3' })));
  let author = await db.authors.findById(selectedAuthorId);
  while (true) {
    console.log(TableView.buildTable([author]));
    const answers: any = await inquirer.prompt(selectedAuthorPrompts.menu);
    switch (answers.mode) {
      case SelectedAuthorModes.UPDATE:
        await update(author);
        author = await db.authors.findById(selectedAuthorId);
        break;
      case SelectedAuthorModes.ADD_COMICS:
        await addComics(author);
        break;
      case SelectedAuthorModes.VIEW_ALL_COMICS:
        await interactiveListComics(author);
        break;
      case SelectedAuthorModes.DELETE:
        if (await deleteSelected(author)) {
          return;
        }
        break;
      case SelectedAuthorModes.BACK:
        return;
    }
  }
}
async function update(author: IAuthor) {
  const answers: any = await inquirer.prompt(
    selectedAuthorPrompts.getUpdatePrompt(author),
  );
  await db.authors.updateById(author.id, answers);
}
async function addComics(author: IAuthor) {
  const answers: any = await inquirer.prompt(comicsPrompts.selectById);
  try {
    await db.comicsAuthors.insertOne({
      comicsId: +answers.comicsId,
      authorId: +(author.id as any),
    });
  } catch (err) {
    console.log('You trying to insert duplicated value');
  }
}

function listComics(author: IAuthor) {
  return async ({ limit, offset }: IListFunctionArgs) => {
    console.log(
      TableView.buildTable(
        await db.comicsAuthors.listComicsOfAuthor(author.id || 0, {
          limit,
          offset,
        }),
      ),
    );
  };
}

function interactiveListComics(author: IAuthor) {
  return InteractiveTableView.display(listComics(author), 0, 10);
}

async function deleteSelected(author: IAuthor): Promise<boolean> {
  const answers = (await inquirer.prompt(selectedAuthorPrompts.delete)) as any;
  if (answers.confirm) {
    await db.authors.deleteById(author.id as any);
    return true;
  }
  return false;
}
