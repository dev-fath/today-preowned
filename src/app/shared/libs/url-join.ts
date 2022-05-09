/**
 * url join 처리
 * @param parts
 */
export function urlJoin(...parts: string[]): string {
  const [p, ...rest] = parts;

  return p.replace(/\/$/, '') + ('/' + rest.join('/')).replace(/\/\/+/g, '/');
}
