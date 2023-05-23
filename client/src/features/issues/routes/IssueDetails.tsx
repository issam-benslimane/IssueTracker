import { TypeIcon } from "../components/TypeIcon";
import { FiSend } from "react-icons/fi";
import { HiLink } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { useParams } from "react-router";
import { useIssue } from "../hooks";
import { TextEditor } from "../components/TextEditor";
import TextareaAutosize from "react-autosize-textarea/lib";
import { IssueType } from "../constants";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { TIssue } from "../types";

export const IssueDetails = () => {
  const { issueId } = useParams();
  const { issue, setIssue } = useIssue(issueId as string);

  if (!issue) return null;

  return (
    <div className="absolute inset-0 z-[1000] bg-black/50">
      <div className="absolute left-1/2 top-1/2 w-[80%] max-w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6">
        <Header type={issue.type} />
        <Summary summary={issue.summary} />
        <Description description={issue.description} setIssue={setIssue} />
      </div>
    </div>
  );
};

const Header = ({ type }: { type: IssueType }) => {
  return (
    <div className="flex items-center gap-6">
      <button className="flex items-center gap-2">
        <TypeIcon type={type} />
        <span className="text-sm uppercase text-slate-600">{type}</span>
      </button>
      <button className="ml-auto flex items-center gap-2 text-sm text-slate-700">
        <FiSend size={20} />
        <span>Give feedback</span>
      </button>
      <button className="flex items-center gap-2 text-sm text-slate-700">
        <HiLink size={20} />
        <span>Copy Link</span>
      </button>
      <button className="text-slate-700">
        <RiDeleteBinLine size={20} />
      </button>
      <button className="text-slate-700">
        <IoCloseOutline size={25} />
      </button>
    </div>
  );
};

const Summary = ({ summary }: { summary: string }) => {
  const [text, setText] = useState(summary);

  const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setText(ev.target.value.trim());
  };

  return (
    <TextareaAutosize
      value={text}
      onChange={handleChange}
      placeholder="Short Summary"
      className="my-7 h-8 resize-none text-2xl font-medium text-slate-800"
    />
  );
};

const Description = ({
  description,
  setIssue,
}: {
  description: string;
  setIssue: Dispatch<SetStateAction<TIssue | undefined>>;
}) => {
  const [text, setText] = useState(description);
  const [isEditing, setIsEditing] = useState(false);

  const onSave = () => {
    setIssue((prev) => ({ ...prev, description: text }));
  };

  const onCancel = () => {
    setText(description);
    setIsEditing(false);
  };

  return (
    <>
      <p className="mb-2 text-sm font-medium text-slate-800">Description:</p>
      {isEditing ? (
        <>
          <TextEditor text={text} setText={setText} />
          <div className="mt-3 flex gap-1">
            <button
              onClick={onSave}
              className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:brightness-110"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-black/10"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="text-sm text-slate-800 [&>*:is(h1,h2,h3,h4,h5,h6)]:font-bold [&>h1]:text-2xl [&>h2]:text-xl [&>h3]:text-lg"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </>
  );
};
