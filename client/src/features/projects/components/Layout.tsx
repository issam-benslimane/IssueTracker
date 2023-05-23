import { Logo } from "./Logo";
import { Sidebar } from "./Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="grid grid-cols-[auto_220px_1fr]">
      <div className="bg-blue-700 px-4 py-6">
        <Logo />
      </div>
      <Sidebar />
      {children}
    </div>
  );
};
