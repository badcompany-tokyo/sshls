import {
  calcMaxLength,
  configContent,
  parseSSHConfig,
} from '../libs/ssh-config.ts';
import type { Host } from '../types.ts';

export const all = () => {
  const targetParams: (keyof Host)[] = ['alias', 'hostname', 'port', 'user'];
  const hosts = parseSSHConfig(configContent);
  const maxLengths = new Map<keyof Host, number>(targetParams.map((
    param,
  ) => [param, calcMaxLength(hosts, param)]));
  console.log(
    `${'[Host]'.padEnd(maxLengths.get('alias')!)}  ${
      '[Hostname]'.padEnd(maxLengths.get('hostname')!)
    }  ${'[port]'.padEnd(maxLengths.get('port')!)}  ${
      '[user]'.padEnd(maxLengths.get('user')!)
    }`,
  );
  for (const host of hosts) {
    console.log(
      ` ${host.alias.join(', ').padEnd(maxLengths.get('alias')!)}  ${
        host.hostname.padEnd(maxLengths.get('hostname')!)
      }  ${(host.port ?? '').padEnd(maxLengths.get('port')!)}  ${
        (host.user ?? '').padEnd(maxLengths.get('user')!)
      }`,
    );
  }
};
