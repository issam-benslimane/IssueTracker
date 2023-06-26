import moment from "moment";

export const fromNow = (date: Date) => {
  return moment(date).fromNow();
};
