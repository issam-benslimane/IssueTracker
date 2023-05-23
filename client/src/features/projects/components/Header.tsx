import { useProject } from "../providers";

type HeaderProps = {
  currentPath: string;
};

export const Header = ({ currentPath }: HeaderProps) => {
  const { name } = useProject();
  return (
    <header>
      <p className="font-medium text-slate-500">
        Projects / {name} / {currentPath}
      </p>
      <h1 className="text-xl font-semibold text-slate-800">{currentPath}</h1>
    </header>
  );
};
