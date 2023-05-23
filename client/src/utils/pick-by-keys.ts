import { keys as objectKeys } from "./object-keys";

export function pick<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
) {
  return keys.reduce((result, key) => {
    return { ...result, [key]: obj[key] };
  }, {});
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
) {
  const pickedKeys = objectKeys(obj).filter((key) => !keys.includes(key as K));
  return pick(obj, ...pickedKeys);
}
