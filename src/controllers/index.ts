const clear = require('clear');
import * as menu from './menu';
import * as inquirer from 'inquirer';

inquirer.registerPrompt(
  'autocomplete',
  require('inquirer-autocomplete-prompt'),
);
inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));
inquirer.registerPrompt('number', require('inquirer-number-plus'));
export async function start() {
  clear();
  menu.start();
}
