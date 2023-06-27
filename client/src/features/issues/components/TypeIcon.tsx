import { AiFillBug } from "react-icons/ai";
import { BsFillBookmarkFill, BsFillCheckSquareFill } from "react-icons/bs";
import { IssueType } from "../constants";

type TypeIconProps = { type: IssueType; size?: number };

export const TypeIcon = ({ type, size }: TypeIconProps) => {
  switch (type) {
    case "bug":
      return <AiFillBug className="text-red-700" size={size} />;
    case "task":
      return <BsFillCheckSquareFill className="text-blue-400" size={size} />;
    case "story":
      return <BsFillBookmarkFill className="text-green-500" size={size} />;
    default:
      return null;
  }
};
