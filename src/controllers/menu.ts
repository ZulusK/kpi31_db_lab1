import * as inquirer from 'inquirer';
import * as comicsCtrl from './comics';
const clear = require('clear');
import * as figlet from 'figlet';
import chalk from 'chalk';

enum Modes {
  OPERATIONS_WITH_COMICS = 'work with comics',
  EXIT = 'exit',
}
const menuItems = [
  {
    name: 'mode',
    type: 'list',
    message: "What's next?",
    choices: [Modes.OPERATIONS_WITH_COMICS, Modes.EXIT],
    default: 0,
  },
];

export async function start() {
  while (true) {
    clear();
    console.log(
      chalk.yellowBright(
        figlet.textSync('Hello, guys', { font: 'Big Money-nw' }),
      ),
    );
    const answers: any = await inquirer.prompt(menuItems);
    switch (answers.mode) {
      case Modes.OPERATIONS_WITH_COMICS:
        await comicsCtrl.start();
        break;
      case Modes.EXIT:
        return;
    }
  }
}
