import clsx from "clsx";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={clsx("max-w-[70rem] mx-auto px-2", className)}>
      {children}
    </div>
  );
};
