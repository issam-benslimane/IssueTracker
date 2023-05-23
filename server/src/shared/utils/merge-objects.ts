export function mergeObjects<T extends object>(...obj: T[]) {
  return obj.reduce((final, current) => {
    for (const key in current) {
      const currentValue = current[key],
        prevValue = final[key];
      if (
        currentValue &&
        prevValue &&
        typeof currentValue === "object" &&
        typeof prevValue === "object"
      ) {
        Object.assign(final, {
          [key]: mergeObjects<typeof currentValue>(prevValue, currentValue),
        });
      } else Object.assign(final, { [key]: currentValue });
    }
    return final;
  }, {} as T);
}
