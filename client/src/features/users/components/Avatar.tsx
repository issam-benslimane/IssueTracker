import clsx from "clsx";

export type AvatarProps = {
  avatarUrl: string;
  size: keyof typeof sizes;
  className?: string;
};

const sizes = {
  sm: "w-6",
  md: "w-8",
  lg: "w-12",
};

export const Avatar = ({ avatarUrl, size, className }: AvatarProps) => {
  return (
    <img
      src={avatarUrl}
      alt=""
      className={clsx("rounded-full", className, sizes[size])}
    />
  );
};
