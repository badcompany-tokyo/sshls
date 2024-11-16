import { parseArgs } from 'jsr:@std/cli@1.0.6/parse-args';
import { help } from './options/help.ts';
import { options } from './options/index.ts';
import { version } from './options/version.ts';
import { all } from './options/all.ts';
import { short } from './options/short.ts';
import { defaultFn } from './options/default.ts';

const flags = parseArgs(Deno.args, options);

switch (true) {
  case flags['all']:
    all(flags._.toString());
    break;

  case flags['short']:
    short(flags._.toString());
    break;

  case flags['version']:
    version();
    break;

  case flags['help']:
    help();
    break;

  default:
    defaultFn(flags._.toString());
}
