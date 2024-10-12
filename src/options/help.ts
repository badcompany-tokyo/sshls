const content = `
Usage: sshls [Options]...
Options:
  -a, --all   : Show all information
  -s, --short : Show short information
  -h, --help  : Show help
`;

export const help = () => {
  console.log(content);
};
