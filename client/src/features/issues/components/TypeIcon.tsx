import { AiFillBug } from "react-icons/ai";
import { BsFillBookmarkFill, BsFillCheckSquareFill } from "react-icons/bs";
import { IssueType } from "../constants";

type TypeIconProps = { type: IssueType };

export const TypeIcon = ({ type }: TypeIconProps) => {
  switch (type) {
    case "bug":
      return <AiFillBug className="text-red-700" />;
    case "task":
      return <BsFillCheckSquareFill className="text-blue-400" />;
    case "story":
      return <BsFillBookmarkFill className="text-green-500" />;
    default:
      return null;
  }
};
