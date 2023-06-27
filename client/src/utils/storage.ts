const KEY = "JIRA.TOKEN";

export const storage = {
  getToken() {
    return window.localStorage.getItem(KEY);
  },
  setToken(token: string) {
    window.localStorage.setItem(KEY, token);
  },
};
