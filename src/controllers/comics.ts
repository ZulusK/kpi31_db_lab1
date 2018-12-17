import { raw } from 'objection';

const clear = require('clear');
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as figlet from 'figlet';
import InteractiveTableView, { IListFunctionArgs } from '../views/InteractiveTableView';
import TableView from '../views/TableView';
import * as selectedComicsCtrl from './selectedComics';
import { comics } from '../utils';
import {
  comicsPrompts,
  randomizeEntitiesPromptItems,
  ComicsModes
} from './prompts';
import { Comics } from '../db';

export async function start() {
  clear();
  console.log(
      chalk.redBright(figlet.textSync('Comics', { font: 'Isometric3' }))
  );
  while (true) {
    const answers: any = await inquirer.prompt(comicsPrompts.menu);
    switch (answers.mode) {
      case ComicsModes.SEARCH:
        await search();
        break;
      case ComicsModes.STARS:
        await stars();
        break;
      case ComicsModes.BACK_SEARCH:
        await backSearch();
        break;
      case ComicsModes.LIST:
        await interactiveList();
        break;
      case ComicsModes.CREATE:
        await createComics();
        break;
      case ComicsModes.RANDOMIZE:
        await randomize();
        break;
      case ComicsModes.DROP:
        await empty();
        break;
      case ComicsModes.SELECT:
        await select();
        break;
      case ComicsModes.ADVANCED_SEARCH:
        await interactiveAdvancedSearch();
        break;
      case ComicsModes.BACK:
        return;
    }
  }
}

async function createComics() {
  const answers: any = await inquirer.prompt(comicsPrompts.create);
  const comic = await Comics.query().insertAndFetch(answers);
  console.log(TableView.buildTable([comic]));
}

async function listComics({ offset, limit }: IListFunctionArgs) {
  const list = await Comics.query().limit(limit).offset(offset);
  const total = (await Comics.query().count() as any).count;
  clear();
  console.log(TableView.buildTable(list));
  console.log(
      chalk.cyan('total:'),
      total,
      chalk.red('limit:'),
      limit,
      chalk.magenta('offset:'),
      offset
  );
}

async function stars() {
  console.log(TableView.buildTable(
      await Comics
          .query()
          .select('*').from(raw('calculate_stars()'))));
}

function interactiveList() {
  return InteractiveTableView.display(listComics, 0, 10);
}

async function randomize() {
  const answers: any = await inquirer.prompt(randomizeEntitiesPromptItems);
  const comicsRandomData = Array.from(
      { length: answers.count },
      comics.randomData
  );
  const createdComics = await Comics.query().insertAndFetch(comicsRandomData);
  console.log(TableView.buildTable(createdComics));
}

async function empty() {
  const answers: any = await inquirer.prompt({
    name: 'confirm',
    type: 'confirm'
  });
  if (answers.confirm) {
    console.log(TableView.buildTable(await Comics.query().del()));
  }
}

async function search() {
  const answers: any = await inquirer.prompt(comicsPrompts.search);
  console.log(
      TableView.buildTable(
          await Comics
              .query()
              // tslint:disable-next-line:max-line-length
              .select(raw('id, ts_headline(title, q) as title, ts_headline(category::text, q) as category'))
              .from(raw('comics, plainto_tsquery (?) AS q', [answers.query]))
              .where(raw('make_tsvector(title, category) @@ plainto_tsquery(?)', [answers.query]))
              .orderBy(raw('ts_rank(make_tsvector(title, category), q)'), 'DESC'),
          { maxLength: 0 })
  );
}

async function select() {
  const answers = await inquirer.prompt(comicsPrompts.selectById) as any;
  await selectedComicsCtrl.start(answers.comicsId);
}

function advancedSearch(args: any) {
  return async ({ offset, limit }: IListFunctionArgs) => {
    const list = await Comics.query().where({
      category: args.category,
      'series.isEnded': args.isEnded
    })
        .leftJoinRelation('series')
        .limit(limit).offset(offset);
    const total = (await Comics.query().count() as any).count;
    clear();
    console.log(TableView.buildTable(list));
    console.log(
        chalk.cyan('total:'),
        total,
        chalk.red('limit:'),
        limit,
        chalk.magenta('offset:'),
        offset
    );
  };
}

async function interactiveAdvancedSearch() {
  const answers = await inquirer.prompt(comicsPrompts.advancedSearch);
  return InteractiveTableView.display(advancedSearch(answers as any), 0, 10);
}

async function backSearch() {
  const answers: any = await inquirer.prompt(comicsPrompts.search);
  console.log(
      TableView.buildTable(
          await Comics
              .query()
              .select(raw('id, ts_headline(title, q) as title, ts_headline(category::text, q) as category')) // tslint:disable-line:max-line-length
              .from(raw('comics, plainto_tsquery(?) AS q', [answers.query]))
              .where(raw('NOT make_tsvector(title, category) @@ plainto_tsquery(?)', [answers.query])) // tslint:disable-line:max-line-length
              .orderBy(raw('ts_rank(make_tsvector(title, category), q)'), 'DESC'),
          { maxLength: 0 })
  );
}
