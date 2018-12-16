const clear = require('clear');
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as figlet from 'figlet';
import { Author, Comics } from '../db/models';
import TableView from '../views/TableView';
import InteractiveTableView, { IListFunctionArgs } from '../views/InteractiveTableView';
import {
  SelectedAuthorModes,
  selectedAuthorPrompts,
  comicsPrompts
} from './prompts';

export async function start(selectedAuthorId: string) {
  clear();
  console.log(chalk.cyan(figlet.textSync('Author', { font: 'Isometric3' })));
  const author = await Author.query().findById(selectedAuthorId);
  if (author) {
    while (true) {
      console.log(TableView.buildTable([author]));
      const answers: any = await inquirer.prompt(selectedAuthorPrompts.menu);
      switch (answers.mode) {
        case SelectedAuthorModes.UPDATE:
          await update(author);
          break;
        case SelectedAuthorModes.ADD_COMICS:
          await addComics(author);
          break;
        case SelectedAuthorModes.DELETE_COMICS:
          await deleteComics(author);
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
  } else {
    clear();
    console.log('No such author exists');
  }
}

async function update(author: Author) {
  const answers: any = await inquirer.prompt(
      selectedAuthorPrompts.getUpdatePrompt(author)
  );
  await author.$query().patch(answers);
}

async function addComics(author: Author) {
  const answers: any = await inquirer.prompt(comicsPrompts.selectById);
  try {
    const comics = await Comics.query().findById(answers.comicsId) as any;
    await author.$relatedQuery('comics').relate(comics.id);
  } catch (err) {
    console.log('You trying to insert duplicated value');
  }
}

function listComics(author: Author) {
  return async ({ limit, offset }: IListFunctionArgs) => {
    console.log(
        TableView.buildTable(
            await author
                .$relatedQuery('comics')
                .limit(limit)
                .offset(offset)
        )
    );
  };
}

function interactiveListComics(author: Author) {
  return InteractiveTableView.display(listComics(author), 0, 10);
}

async function deleteSelected(author: Author): Promise<boolean> {
  const answers = (await inquirer.prompt(selectedAuthorPrompts.delete)) as any;
  if (answers.confirm) {
    await author.$query().delete();
    return true;
  }
  return false;
}

async function deleteComics(author: Author) {
  const answers = (await inquirer.prompt(
      selectedAuthorPrompts.getDeleteComicsByIdAndAuthor(author)
  )) as any;
  if (answers.confirm) {
    try {
      await author
          .$relatedQuery('comics')
          .unrelate()
          .where('id', answers.comicsId);
    } catch (err) {
      return false;
    }
    return true;
  }
  return false;
}
