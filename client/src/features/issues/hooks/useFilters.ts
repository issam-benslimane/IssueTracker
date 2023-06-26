import { keys } from "@/utils/object-keys";
import { useState } from "react";

export type FilterState = {
  search: string;
  users: number[];
  myIssue: boolean;
  recentlyUpdated: boolean;
};

const initialFilters: FilterState = {
  search: "",
  users: [],
  myIssue: false,
  recentlyUpdated: false,
};

export const useFilters = () => {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilters = (filters: FilterState) => {
    const newFilters = keys(filters).reduce((final, key) => {
      if (key === "search") final[key] = filters[key].trim();
      else if (key === "users") final[key] = removeDuplicates(filters[key]);
      else final[key] = filters[key];
      return final;
    }, {} as FilterState);
    setFilters(newFilters);
  };

  const areFiltersClear = () => {
    const { search, users, myIssue, recentlyUpdated } = filters;
    return (
      search === "" &&
      users.length === 0 &&
      myIssue === false &&
      recentlyUpdated === false
    );
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return { filters, updateFilters, areFiltersClear, clearFilters };
};

function removeDuplicates(arr: any[]) {
  return arr.filter((e) => arr.indexOf(e) === arr.lastIndexOf(e));
}
