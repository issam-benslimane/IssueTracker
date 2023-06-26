import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  loading?: boolean;
};

const variants = {
  primary: "",
  secondary: "",
  terniary: "",
};

const Button = ({
  className,
  variant,
  loading = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center gap-2 rounded-md transition-all",
        variant && variants[variant],
        className
      )}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
};

export default Button;
