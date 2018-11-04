import * as inquirer from 'inquirer';
import * as comicsCtrl from './comics';
import * as seriesCtrl from './series';
import * as authorsCtrl from './authors';
import * as charactersCtrl from './characters';

const clear = require('clear');
import * as figlet from 'figlet';
import chalk from 'chalk';

enum Modes {
  OPERATIONS_WITH_COMICS = 'Work with comics',
  OPERATIONS_WITH_SERIES = 'Work with series',
  OPERATIONS_WITH_CHARACTERS = 'Work with characters',
  OPERATIONS_WITH_AUTHORS = 'Work with authors',
  EXIT = 'Exit',
}

const menuItems = [
  {
    name: 'mode',
    type: 'list',
    message: "What's next?",
    choices: [
      Modes.OPERATIONS_WITH_COMICS,
      Modes.OPERATIONS_WITH_SERIES,
      Modes.OPERATIONS_WITH_CHARACTERS,
      Modes.OPERATIONS_WITH_AUTHORS,
      Modes.EXIT,
    ],
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
      case Modes.OPERATIONS_WITH_SERIES:
        await seriesCtrl.start();
        break;
      case Modes.OPERATIONS_WITH_CHARACTERS:
        await charactersCtrl.start();
        break;
      case Modes.OPERATIONS_WITH_AUTHORS:
        await authorsCtrl.start();
        break;
      case Modes.EXIT:
        clear();
        console.log(chalk.green(figlet.textSync('Bye!', { font: 'Coinstak' })));
        process.exit(0);
        return;
    }
  }
}
