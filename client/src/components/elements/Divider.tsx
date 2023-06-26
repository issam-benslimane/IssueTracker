import clsx from "clsx";
import React from "react";

type DividerProps = {
  horizontal?: boolean;
  vertical?: boolean;
  className?: string;
};

export const Divider = ({ vertical = false, className }: DividerProps) => {
  return (
    <div
      aria-hidden
      className={clsx(
        "bg-black/10",
        vertical ? "w-[1px]" : "w-full h-[1px]",
        className
      )}
    />
  );
};
