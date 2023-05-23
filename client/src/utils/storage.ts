const KEY = "JIRA.TOKEN";

export const storage = Object.defineProperty(Object.create(null), "token", {
  get() {
    return window.localStorage.getItem(KEY);
  },
  set(v: string) {
    window.localStorage.setItem(KEY, v);
  },
});
