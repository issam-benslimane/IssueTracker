import { useEffect } from "react";

export const useClickOutside = <T extends HTMLElement>(
  ref: { current: T | null },
  cb: () => void
) => {
  const handleClick = (ev: MouseEvent) => {
    if (!ref.current) return;
    const target = ev.target as HTMLElement;
    if (ref.current.contains(target)) return;
    cb();
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClick, true);

    return () => {
      document.body.removeEventListener("click", handleClick, true);
    };
  }, []);
};
