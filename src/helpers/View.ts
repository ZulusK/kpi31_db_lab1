import * as readline from 'readline';

export default class View {
  private rl:readline.ReadLine;
  public constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  public destroy() {
    this.rl.close();
  }
  public print(message: string, ...args: [any]) {
    console.log(message, args);
  }
  public ask(message?: string):Promise<string> {
    return new Promise(resolve => this.rl.question(message || '', (answer) => {
      resolve(answer);
    }));
  }
}
