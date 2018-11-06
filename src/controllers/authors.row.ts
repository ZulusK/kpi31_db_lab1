const clear = require('clear');
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as figlet from 'figlet';
import * as _ from 'lodash';
import { db } from '../db';
import { IAuthor } from '../db/models/authors/authors.model';
import { genders } from '../db/types';
import { filterCountries } from '../utils/countries';

enum Modes {
  UPDATE = 'update',
  BACK = '<-',
}

const menuItems = [
  {
    name: 'mode',
    type: 'list',
    message: "What's next?",
    choices: [Modes.UPDATE, Modes.BACK],
    default: 0,
  },
];

const getUpdatePrompt = (author: IAuthor) => [
  {
    name: 'name',
    type: 'input',
    message: 'Name:',
    default: author.name,
  },
  {
    name: 'gender',
    type: 'list',
    message: 'Gender:',
    choices: genders,
    default: author.gender,
  },
  {
    name: 'country',
    type: 'autocomplete',
    source: (__: any, input: string) => {
      return Promise.resolve(filterCountries(input));
    },
    message: 'Country:',
    default: author.country,
  },
  {
    name: 'dob',
    type: 'datetime',
    message: 'Date of birth:',
    format: ['d', '/', 'm', '/', 'yyyy'],
    initial: author.dob,
  },
];

export async function start(selectedAuthorId: string) {
  clear();
  console.log(chalk.cyan(figlet.textSync('Author', { font: 'Isometric3' })));
  let author = await db.authors.findById(selectedAuthorId);
  while (true) {
    const answers: any = await inquirer.prompt(menuItems);
    switch (answers.mode) {
      case Modes.UPDATE:
        await update(author);
        author = await db.authors.findById(selectedAuthorId);
        return;
      case Modes.BACK:
        return;
    }
  }
}
async function update(author: IAuthor) {
  const answers: any = await inquirer.prompt(getUpdatePrompt(author));
  await db.authors.updateById(author.id, answers);
}
