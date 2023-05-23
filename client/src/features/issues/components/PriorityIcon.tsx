import { IssuePriority } from "../constants";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

type PriorityIconProps = { priority: IssuePriority };

export const PriorityIcon = ({ priority }: PriorityIconProps) => {
  switch (priority) {
    case "highest":
      return <AiOutlineArrowUp className="text-red-800" />;
    case "high":
      return <AiOutlineArrowUp className="text-red-500" />;
    case "medium":
      return <AiOutlineArrowUp className="text-orange-800" />;
    case "lowest":
      return <AiOutlineArrowDown className="text-green-800" />;
    case "low":
      return <AiOutlineArrowDown className="text-green-500" />;
    default:
      return null;
  }
};
