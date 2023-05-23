import { generateUuid } from "./generateId";

export function slugify(text: string) {
  const randomId = generateUuid().split("-")[0];
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .concat("-" + randomId);
}
