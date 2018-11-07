import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({
  path: path.resolve('.env'),
});
export { default as db } from './db';
export { default as log } from './log';
export { default as env } from './env';
export { default as prompts } from './prompts';
