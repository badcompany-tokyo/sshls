import { calcMaxLength, configContent, parseSSHConfig } from '../libs/ssh-config.ts';
import type { Host } from '../types.ts';

export const tail = (pattern = '') => {
  const targetParams = ['alias', 'hostname', 'port', 'user', 'identityFile'] as const;
  const hosts = parseSSHConfig(configContent);

  // Reverse the hosts array to display from the bottom
  const reversedHosts = [...hosts].reverse();

  const maxLengths = new Map<keyof Host, number>(targetParams.map((param) => [param, calcMaxLength(hosts, param)]));

  // Get values with fallback to avoid non-null assertions
  const getLength = (key: keyof Host) => maxLengths.get(key) ?? key.length + 2;

  console.log(
    `${'[Host]'.padEnd(getLength('alias'))}  ${'[Hostname]'.padEnd(getLength('hostname'))}  ${'[Port]'.padEnd(getLength('port'))}  ${'[User]'.padEnd(getLength('user'))}  ${'[Key]'.padEnd(
      getLength('identityFile')
    )}`
  );

  for (const host of reversedHosts) {
    if (pattern && host.alias.some((alias) => !alias.includes(pattern))) continue;
    console.log(
      `${host.alias.join(', ').padEnd(getLength('alias'))}  ${host.hostname.padEnd(getLength('hostname'))}  ${(host.port ?? '').padEnd(getLength('port'))}  ${(host.user ?? '').padEnd(
        getLength('user')
      )}  ${host.identityFile ? host.identityFile.split('/').pop() ?? '' : ''.padEnd(getLength('identityFile'))}`
    );
  }
};
