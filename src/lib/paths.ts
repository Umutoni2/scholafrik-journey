const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function prefix(path: string) {
  if (/^(https?:|mailto:|tel:|#)/i.test(path)) return path;
  if (!BASE_PATH) return path;
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Prefix app-root asset paths so GitHub Pages can serve them under /repo-name. */
export function withBasePath(path: string): string;
export function withBasePath(path?: string): string | undefined;
export function withBasePath(path?: string) {
  if (!path) return path;
  return prefix(path);
}

