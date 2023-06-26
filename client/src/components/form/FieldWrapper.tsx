import clsx from "clsx";
import { LabelHTMLAttributes } from "react";

export type FieldWrapperProps = LabelHTMLAttributes<HTMLLabelElement> & {
  label?: string;
};

export const FieldWrapper = ({
  className,
  label,
  children,
}: FieldWrapperProps) => {
  return (
    <label className={clsx("block", className)}>
      <p className="font-medium capitalize mb-2">{label}</p>
      {children}
    </label>
  );
};
