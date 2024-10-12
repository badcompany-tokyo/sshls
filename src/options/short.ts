import {
  configContent,
  parseSSHConfig,
} from '../libs/ssh-config.ts';

export const short = () => {
  const hosts = parseSSHConfig(configContent);
  console.log('[Host]');
  for (const host of hosts) {
    console.log(
      ` ${host.alias.join(', ')}`,
    );
  }
};
