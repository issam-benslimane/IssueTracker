import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

type TextEditorProps = {
  text?: string;
  setText: Dispatch<SetStateAction<string>>;
};

export const TextEditor = ({ text, setText }: TextEditorProps) => {
  const [quill, setQuill] = useState<Quill>();

  const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
    if (!wrapper) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.appendChild(editor);
    const quill = new Quill(editor, { theme: "snow" });
    if (text) quill.root.innerHTML = text;
    setQuill(quill);
    quill.on("text-change", () => setText(quill.root.innerHTML));
  }, []);

  return <div ref={wrapperRef}></div>;
};
