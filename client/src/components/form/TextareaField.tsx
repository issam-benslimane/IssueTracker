import React from "react";
import { FieldWrapper, FieldWrapperProps } from "./FieldWrapper";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  FieldWrapperProps & { error?: string };

export const Textarea = ({ label, error, ...props }: TextareaProps) => {
  return (
    <FieldWrapper label={label}>
      <textarea {...props} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </FieldWrapper>
  );
};
