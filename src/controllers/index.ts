const clear = require('clear');
import * as menu from './menu';
import * as inquirer from 'inquirer';

inquirer.registerPrompt(
  'autocomplete',
  require('inquirer-autocomplete-prompt'),
);
inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));
inquirer.registerPrompt('number', require('inquirer-number-plus'));
inquirer.registerPrompt(
  'autocomplete',
  require('inquirer-autocomplete-prompt'),
);

export const randomizeEntitiesPromptItems: any = [
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
  await menu.start();
}
