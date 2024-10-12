import {
  calcMaxLength,
  configContent,
  parseSSHConfig,
} from '../libs/ssh-config.ts';
import type { Host } from '../types.ts';

export const defaultFn = () => {
  const targetParams: (keyof Host)[] = ['alias', 'hostname'];
  const hosts = parseSSHConfig(configContent);
  const maxLengths = new Map<keyof Host, number>(targetParams.map((
    param,
  ) => [param, calcMaxLength(hosts, param)]));
  console.log(
    `${'[Host]'.padEnd(maxLengths.get('alias')!)}  ${
      '[Hostname]'.padEnd(maxLengths.get('hostname')!)
    }`,
  );
  for (const host of hosts) {
    console.log(
      ` ${host.alias.join(', ').padEnd(maxLengths.get('alias')!)}  ${
        host.hostname.padEnd(maxLengths.get('hostname')!)
      }`,
    );
  }
};
