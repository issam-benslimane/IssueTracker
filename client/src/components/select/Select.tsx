import { useClickOutside } from "@/hooks";
import clsx from "clsx";
import React, {
  HTMLAttributes,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

type SelectProps = {
  selected: string | string[];
  children: React.ReactNode;
  onSelect: (v: any) => void;
};

type OptionProps = HTMLAttributes<HTMLButtonElement> & {
  value: string;
};

type ButtonProps = HTMLAttributes<HTMLButtonElement>;

type DropdownProps = HTMLAttributes<HTMLDivElement>;

type ContextValue = {
  isShowed: boolean;
  isSelected: (v: string) => boolean;
  updateSelectedValue: (v: string) => void;
  toggle: () => void;
};

const SelectContext = createContext<ContextValue | undefined>(undefined);

export const Select = ({ children, selected, onSelect }: SelectProps) => {
  const [isShowed, setIsShowed] = useState(false);
  const isMulti = (v: unknown): v is string[] => Array.isArray(v);
  const toggle = () => setIsShowed((prev) => !prev);
  const isSelected = (v: string) => {
    return isMulti(selected) ? selected.includes(v) : selected === v;
  };
  const updateSelectedValue = (v: string) => {
    const newSelected = isMulti(selected) ? selected.concat(v) : v;
    onSelect(newSelected);
  };

  return (
    <SelectContext.Provider
      value={{ isShowed, isSelected, updateSelectedValue, toggle }}
    >
      <div className="relative text-sm">{children}</div>
    </SelectContext.Provider>
  );
};

Select.Button = function Button({ children, className }: ButtonProps) {
  const { toggle } = useSelect();
  const handleClick = () => {
    toggle();
  };
  return (
    <button
      onClick={handleClick}
      className={clsx("flex items-center gap-2 rounded-md", className)}
    >
      {children}
    </button>
  );
};

Select.Dropdown = function Dropdown({ children }: DropdownProps) {
  const { isShowed, toggle } = useSelect();
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, toggle);

  if (!isShowed) return null;

  return (
    <div
      ref={ref}
      className="absolute z-50 flex w-full flex-col bg-white shadow-md"
    >
      {children}
    </div>
  );
};

Select.Option = function Option({ children, className, value }: OptionProps) {
  const { toggle, isSelected, updateSelectedValue } = useSelect();
  if (isSelected(value)) return null;
  const handleClick = () => {
    toggle();
    updateSelectedValue(value);
  };
  return (
    <button
      onClick={handleClick}
      className={clsx(
        "flex items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-cyan-50",
        className
      )}
    >
      {children}
    </button>
  );
};

const useSelect = () => {
  const value = useContext(SelectContext);
  if (!value) throw new Error("Please use context inside the provider");
  return value;
};
