const clear = require('clear');
import * as menuCtrl from './menu';
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

export async function start() {
  clear();
  await menuCtrl.start();
}
