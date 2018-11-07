import * as inquirer from 'inquirer';
import * as comicsCtrl from './comics';
import * as seriesCtrl from './series';
import * as authorsCtrl from './authors';
import * as charactersCtrl from './characters';

const clear = require('clear');
import * as figlet from 'figlet';
import chalk from 'chalk';
import { MenuModes, menuPrompts } from './prompts';

export async function start() {
  while (true) {
    clear();
    console.log(
      chalk.yellowBright(
        figlet.textSync('Hello, guys', { font: 'Big Money-nw' }),
      ),
    );
    const answers: any = await inquirer.prompt(menuPrompts.menu);
    switch (answers.mode) {
      case MenuModes.OPERATIONS_WITH_COMICS:
        await comicsCtrl.start();
        break;
      case MenuModes.OPERATIONS_WITH_SERIES:
        await seriesCtrl.start();
        break;
      case MenuModes.OPERATIONS_WITH_CHARACTERS:
        await charactersCtrl.start();
        break;
      case MenuModes.OPERATIONS_WITH_AUTHORS:
        await authorsCtrl.start();
        break;
      case MenuModes.EXIT:
        clear();
        console.log(chalk.green(figlet.textSync('Bye!', { font: 'Coinstak' })));
        process.exit(0);
        return;
    }
  }
}
