import * as dotenv from 'dotenv';
dotenv.config({
  path:'../.env',
});

export { default as log } from './log';
export { default as env } from './config';
