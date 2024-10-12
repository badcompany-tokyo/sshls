import { type ParseOptions } from 'jsr:@std/cli@1.0.6/parse-args';
import { help } from './help.ts';

export const options: ParseOptions = {
  boolean: ['all', 'short','version', 'help'],
  alias: {
    all: 'a',
    short: 's',
    version: 'v',
    help: 'h',
  },
  unknown: (arg) => {
    console.log(`sshls: illegal option ${arg}`);
    help();
    Deno.exit(1);
  },
};
