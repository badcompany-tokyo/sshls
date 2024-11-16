import { configContent, parseSSHConfig } from '../libs/ssh-config.ts';

export const short = (pattern: string) => {
  const hosts = parseSSHConfig(configContent);
  console.log('[Host]');
  for (const host of hosts) {
    if (host.alias.some((alias) => !(alias.includes(pattern)))) continue;
    console.log(
      `${host.alias.join(', ')}`,
    );
  }
};
