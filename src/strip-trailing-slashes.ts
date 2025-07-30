const onlySlashesRE = /^\/+$/u;
const stripTrailingSlashRE = /(\/+)$/u;

export function stripTrailingSlashes(path: string) {
  if (path.length === 0 || onlySlashesRE.test(path)) {
    return "/";
  }
  return path.replace(stripTrailingSlashRE, "");
}
