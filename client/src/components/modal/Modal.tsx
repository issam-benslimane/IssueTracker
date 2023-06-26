import clsx from "clsx";
import {
  HTMLAttributes,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { useClickOutside } from "../../hooks";

type ModalProps = {
  children: React.ReactNode;
};

type ButtonProps = HTMLAttributes<HTMLButtonElement>;

type ContentProps = HTMLAttributes<HTMLDivElement>;

type ContextValue = {
  isOpen: boolean;
  toggle: () => void;
};

const ModalContext = createContext<ContextValue | undefined>(undefined);

export const Modal = ({ children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <ModalContext.Provider value={{ isOpen, toggle }}>
      {children}
    </ModalContext.Provider>
  );
};

Modal.ToggleButton = function ToggleButton({
  children,
  className,
  ...props
}: ButtonProps) {
  const { toggle } = useToggle();
  return (
    <button className={className} onClick={toggle} {...props}>
      {children}
    </button>
  );
};

Modal.Content = function Content(props: ContentProps) {
  const { isOpen } = useToggle();

  if (!isOpen) return null;
  return (
    <div className="fixed left-0 right-0 top-0 z-50 grid h-full w-full place-content-center overflow-y-auto overflow-x-hidden bg-black/70 p-4">
      <ModalContentBase {...props} />
    </div>
  );
};

const ModalContentBase = ({ children, className }: ContentProps) => {
  const { toggle } = useToggle();
  const elRef = useRef<HTMLDivElement>(null);
  useClickOutside(elRef, toggle);

  return (
    <div
      ref={elRef}
      className={clsx(
        "relative w-[32rem] max-w-[90vw] rounded-md bg-white px-6 py-5 shadow-md shadow-black/30",
        className
      )}
    >
      {children}
    </div>
  );
};

export const useToggle = () => {
  const value = useContext(ModalContext);
  if (!value) throw new Error("Please use context inside the provider");
  return value;
};
