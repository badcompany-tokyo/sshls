import { parseArgs } from '@std/cli/parse-args';
import { help } from './options/help.ts';
import { options } from './options/index.ts';
import { version } from './options/version.ts';
import { all } from './options/all.ts';
import { short } from './options/short.ts';
import { defaultFn } from './options/default.ts';

const flags = parseArgs(Deno.args, options);

if (flags['all']) {
  all();
} else if (flags['short']) {
  short();
} else if (flags['version']) {
  version();
} else if (flags['help']) {
  help();
} else {
  defaultFn();
}
