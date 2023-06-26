import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import { FieldWrapper, FieldWrapperProps } from "./FieldWrapper";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperProps & {
    error?: string;
  };

export const InputField = ({
  label,
  className,
  type = "text",
  error,
  ...props
}: InputFieldProps) => {
  return (
    <FieldWrapper label={label} className={className}>
      <input
        className={clsx(
          "w-full rounded-md border border-slate-300 px-3 py-1 text-slate-600",
          error && "border border-red-500"
        )}
        type={type}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </FieldWrapper>
  );
};
