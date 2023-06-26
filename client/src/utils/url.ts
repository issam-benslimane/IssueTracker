import { keys } from "./object-keys";

export function mergeUrlParts(
  base: string,
  { path, params }: { path?: string; params?: Record<string, string> } = {}
) {
  let url = base.replace(/\/$/g, "");
  if (path) url = [url, path.replace(/^\/|\/$/g, "")].join("/");
  if (params) url = [url, toUrlQueryParams(params)].join("?");
  return url;
}

function toUrlQueryParams(params: Record<string, string>) {
  return keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");
}
