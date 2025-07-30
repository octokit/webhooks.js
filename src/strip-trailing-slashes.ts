export function stripTrailingSlashes(path: string) {
  let i = path.length;
  while (i > 0) {
    if (path.charCodeAt(--i) !== 47 /* '/' */) {
      break;
    }
  }

  if (i === -1) {
    return "/";
  }

  return path.slice(0, i + 1);
}
