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

  const updateFilters = <K extends keyof FilterState>(
    filter: Pick<FilterState, K>
  ) => {
    const newFilters = keys(filter).reduce((final, key) => {
      if (key === "search") return { ...final, [key]: filter[key].trim() };
      else if (key === "users")
        return { ...final, [key]: removeDuplicates(filter[key]) };
      return { ...final, [key]: filter[key] };
    }, filters);
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
