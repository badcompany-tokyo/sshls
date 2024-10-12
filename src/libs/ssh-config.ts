import { join } from '@std/path';
import type { Host } from '../types.ts';

const home = Deno.env.get('HOME');
if (!home) {
  console.log('Error: The HOME environment variable is undefined');
  Deno.exit(1);
}

const configPath = join(home, '.ssh', 'config');

const hostDirectiveParser = (block: string): Host => {
  const host: Host = {
    alias: [],
    hostname: '',
    comment: [],
  };

  const aliasRegex = new RegExp('^\\s*Host\\s+([^\\n#]+)', 'im');
  const aliasMatch = block.match(aliasRegex);
  if (aliasMatch) {
    host.alias = aliasMatch[1].trim().split(/\s+/);
  }

  const hostnamePattern =
    '^\\s*(?:Host\\s*Name|Hostname|HostName)\\s+([^\\n#]+)';
  const hostnameRegex = new RegExp(hostnamePattern, 'gim');
  const hostnameMatch = block.match(hostnameRegex);
  if (hostnameMatch) {
    const lastHostnameLine = hostnameMatch[hostnameMatch.length - 1];
    const hostnameValueMatch = lastHostnameLine.match(
      new RegExp(hostnamePattern, 'i'),
    );
    if (hostnameValueMatch) {
      host.hostname = hostnameValueMatch[1].trim();
    }
  }

  const userRegex = new RegExp('^\\s*User\\s+([^\\n#]+)', 'im');
  const userMatch = block.match(userRegex);
  if (userMatch) {
    host.user = userMatch[1].trim();
  }

  const portRegex = new RegExp('^\\s*Port\\s+(\\d+)', 'im');
  const portMatch = block.match(portRegex);
  if (portMatch) {
    host.port = portMatch[1].trim();
  }

  const identityFileRegex = new RegExp('^\\s*IdentityFile\\s+([^\\n#]+)', 'im');
  const identityFileMatch = block.match(identityFileRegex);
  if (identityFileMatch) {
    host.identityFile = identityFileMatch[1].trim();
  }

  const commentRegex = new RegExp('^\\s*#\\s*(.*)$', 'gm');
  const commentMatches = block.match(commentRegex);
  if (commentMatches) {
    host.comment = commentMatches.map((comment) =>
      comment.replace(/^\s*#\s*/, '').trim()
    );
  }

  return host;
};

export const configContent = Deno.readTextFileSync(configPath);

export const parseSSHConfig = (text: string): Host[] => {
  const hostPattern = /^Host\b.*(?:\n(?!Host\b).*)*/gm;

  const hostDirectives = [];
  let match;

  while ((match = hostPattern.exec(text)) !== null) {
    hostDirectives.push(match[0].trim());
  }
  return hostDirectives.map(hostDirectiveParser);
};

export const calcMaxLength = (configs: Host[], param: keyof Host) => {
  return Math.max(
    ...(configs.map((config) => {
      const t = config[param];
      if (t === undefined) return -1;
      if (typeof t === 'string') return t.length;
      return t.join(', ').length;
    })),
    (param === 'alias' ? 4 : param.length) + 2,
  );
};
