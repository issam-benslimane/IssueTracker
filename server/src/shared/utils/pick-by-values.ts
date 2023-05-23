import { keys } from "./keys";

export function pickValues<T extends object>(
  obj: T,
  strategy: (v: any) => boolean
) {
  return keys(obj).reduce((result, key) => {
    const value = obj[key];
    if (strategy(value)) return { ...result, [key]: value };
    return result;
  }, {});
}

export const filterNullOrUndefined = (obj: object) =>
  pickValues(obj, (v) => v !== null && v !== undefined);

export const filterEmptyStrings = (obj: object) =>
  pickValues(obj, (v) => typeof v === "string" && v.trim().length > 0);
