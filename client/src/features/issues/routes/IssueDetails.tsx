import { TypeIcon } from "../components/TypeIcon";
import { FiSend } from "react-icons/fi";
import { HiLink } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { TextEditor } from "../components/TextEditor";
import { IssuePriority, IssueStatus, IssueType } from "../constants";
import { ChangeEvent, useRef, useState } from "react";
import { useDeleteIssue, useGetIssue, useUpdateIssue } from "../hooks";
import { TIssue } from "../types";
import { Select } from "@/components/select";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";
import { Avatar, TUser, useUsers } from "@/features/users";
import { PriorityIcon } from "../components/PriorityIcon";
import { pick } from "@/utils/pick-by-keys";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Modal } from "@/components/modal";
import { Divider } from "@/components/elements";
import { fromNow } from "@/utils/date";
import Spinner from "@/components/elements/Spinner";
import { useClickOutside } from "@/hooks";

export const IssueDetails = () => {
  const issueId = useParams().issueId as string;
  const projectId = useParams().projectId as string;
  const { data: issue, status, isFetching } = useGetIssue(projectId, issueId);

  if (status === "loading" || isFetching) return <LoadingIssue />;
  if (status === "success")
    return <Details issue={issue} projectId={projectId} />;
  return null;
};

const LoadingIssue = () => {
  return null;
};

const Details = (props: { issue: TIssue; projectId: string }) => {
  const [issue, setIssue] = useState(props.issue);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);
  const updateMutation = useUpdateIssue(props.projectId, String(issue.id));
  const deleteMutation = useDeleteIssue(props.projectId, String(issue.id));

  const updateIssue = (updatedObj: Partial<TIssue>) => {
    setIssue({ ...issue, ...updatedObj });
  };
  const onClose = async () => {
    await updateMutation.mutateAsync(issue);
    navigate(-1);
  };
  const onDelete = () => {
    deleteMutation.mutate();
    navigate(-1);
  };
  useClickOutside(ref, onClose);
  return (
    <div className="fixed inset-0 z-[1000] overflow-scroll bg-black/50 p-12">
      <div
        ref={ref}
        className="mx-auto w-full max-w-[70rem] rounded-md bg-white p-6"
      >
        <Header
          {...pick(issue, "type", "id")}
          isLoading={updateMutation.isLoading}
          update={updateIssue}
          onClose={onClose}
          onDelete={onDelete}
        />
        <div className="grid grid-cols-[60%_1fr] gap-10 py-8">
          <div>
            <Summary summary={issue.summary} update={updateIssue} />
            <Description description={issue.description} update={updateIssue} />
          </div>
          <div>
            <Status status={issue.status} update={updateIssue} />
            <Assignees
              assignees={issue.assignees}
              projectId={props.projectId}
              update={updateIssue}
            />
            <Reporter
              reporter={issue.reporter}
              projectId={props.projectId}
              update={updateIssue}
            />
            <Priority priority={issue.priority} update={updateIssue} />
            <Estimate estimate={issue.estimate} update={updateIssue} />
            <TimeTracking
              {...pick(issue, "estimate", "timeSpent", "timeRemaining")}
              update={updateIssue}
            />
            <Divider horizontal className="my-3" />
            <p className="mb-1 text-sm text-slate-500">
              Created {fromNow(issue.createdAt)}
            </p>
            <p className="text-sm text-slate-500">
              Updated {fromNow(issue.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({
  type,
  id,
  onClose,
  isLoading,
  update,
  onDelete,
}: Pick<TIssue, "type" | "id"> & {
  isLoading: boolean;
  onClose: () => void;
  update: (obj: Partial<TIssue>) => void;
  onDelete: () => void;
}) => {
  return (
    <div className="flex items-center gap-6">
      <Select selected={type} onSelect={(type) => update({ type })}>
        <Select.Button className="flex items-center gap-2">
          <TypeIcon type={type} />
          <span className="text-sm uppercase text-slate-600">
            {type}-{id}
          </span>
        </Select.Button>
        <Select.Dropdown>
          {Object.values(IssueType).map((type) => (
            <Select.Option
              key={type}
              value={type}
              className="flex items-center gap-2"
            >
              <TypeIcon type={type} />
              <span className="capitalize">{type}</span>
            </Select.Option>
          ))}
        </Select.Dropdown>
      </Select>
      <button className="ml-auto flex items-center gap-2 text-sm text-slate-700">
        <FiSend size={20} />
        <span>Give feedback</span>
      </button>
      <button className="flex items-center gap-2 text-sm text-slate-700">
        <HiLink size={20} />
        <span>Copy Link</span>
      </button>
      <button className="text-slate-700" onClick={onDelete}>
        <RiDeleteBinLine size={20} />
      </button>
      <button
        className="flex items-center text-slate-700"
        onClick={onClose}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : <IoCloseOutline size={25} />}
      </button>
    </div>
  );
};

const Summary = ({
  summary,
  update,
}: {
  summary: string;
  update: (obj: Partial<TIssue>) => void;
}) => {
  return (
    <textarea
      value={summary}
      onChange={(ev) => update({ summary: ev.target.value })}
      placeholder="Short Summary"
      className="mb-5 h-8 resize-none text-2xl font-medium text-slate-800"
    />
  );
};

const Description = ({
  description,
  update,
}: {
  description: string;
  update: (obj: Partial<TIssue>) => void;
}) => {
  const [text, setText] = useState(description);
  const [isEditing, setIsEditing] = useState(false);

  const onSave = () => {
    update({ description: text });
    setIsEditing(false);
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

const Status = ({
  status,
  update,
}: {
  status: IssueStatus;
  update: (obj: Partial<TIssue>) => void;
}) => {
  const styles: Record<IssueStatus, string> = {
    [IssueStatus.backlog]: "bg-slate-200 text-slate-800",
    [IssueStatus.selected]: "bg-slate-200 text-slate-800",
    [IssueStatus.inProgress]: "bg-blue-600 text-white",
    [IssueStatus.done]: "bg-green-700 text-white",
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-slate-600">STATUS</p>
      <Select selected={status} onSelect={(status) => update({ status })}>
        <Select.Button
          className={clsx("px-3 py-2 font-medium uppercase", styles[status])}
        >
          <span>{status}</span> <IoIosArrowDown />
        </Select.Button>
        <Select.Dropdown>
          {Object.values(IssueStatus).map((status) => (
            <Select.Option key={status} value={status}>
              <span
                className={clsx(
                  "rounded-md px-2 py-1 font-medium uppercase",
                  styles[status]
                )}
              >
                {status}
              </span>
            </Select.Option>
          ))}
        </Select.Dropdown>
      </Select>
    </div>
  );
};

const Assignees = ({
  assignees,
  projectId,
  update,
}: {
  assignees: TUser[];
  projectId: string;
  update: (obj: Partial<TIssue>) => void;
}) => {
  const { data: users } = useUsers({ projectId });

  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-medium text-slate-600">ASSIGNEES</p>
      <Select
        selected={assignees.map(({ id }) => String(id))}
        onSelect={(ids) =>
          update({
            assignees: users?.filter((user) => ids.includes(String(user.id))),
          })
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          {assignees.map((assignee) => {
            return (
              <span
                key={assignee.id}
                className="flex items-center gap-2 bg-slate-200 px-2 py-1 text-sm font-medium text-slate-700"
              >
                <Avatar avatarUrl={assignee.avatarUrl} size="sm" />
                <span>{assignee.name}</span>
                <button
                  onClick={() =>
                    update({
                      assignees: assignees.filter(
                        ({ id }) => assignee.id !== id
                      ),
                    })
                  }
                >
                  <IoMdClose />
                </button>
              </span>
            );
          })}
          <Select.Button className="font-medium text-blue-700">
            {assignees.length > 0 ? "+ Add more" : "+ Add assignee"}
          </Select.Button>
        </div>
        <Select.Dropdown>
          {users?.map((user) => (
            <Select.Option
              key={user.id}
              value={String(user.id)}
              className="font-medium text-slate-700"
            >
              <Avatar avatarUrl={user.avatarUrl} size="sm" />
              <span>{user.name}</span>
            </Select.Option>
          ))}
        </Select.Dropdown>
      </Select>
    </div>
  );
};

const Reporter = ({
  reporter,
  projectId,
  update,
}: {
  reporter: TUser;
  projectId: string;
  update: (obj: Partial<TIssue>) => void;
}) => {
  const { data: users } = useUsers({ projectId });

  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-medium text-slate-600">Reporter</p>
      <Select
        selected={String(reporter.id)}
        onSelect={(reporterId) =>
          update({
            reporter: users?.find((user) => reporterId === String(user.id)),
          })
        }
      >
        <Select.Button className="bg-slate-200 px-2 py-1 font-medium text-slate-700">
          <Avatar avatarUrl={reporter.avatarUrl} size="sm" />
          <span>{reporter.name}</span>
        </Select.Button>
        <Select.Dropdown>
          {users?.map((user) => (
            <Select.Option key={user.id} value={String(user.id)}>
              <Avatar avatarUrl={user.avatarUrl} size="sm" />
              <span className="px-3 font-medium text-slate-700">
                {user.name}
              </span>
            </Select.Option>
          ))}
        </Select.Dropdown>
      </Select>
    </div>
  );
};

const Priority = ({
  priority,
  update,
}: {
  priority: IssuePriority;
  update: (obj: Partial<TIssue>) => void;
}) => {
  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-medium text-slate-600">Priority</p>
      <Select selected={priority} onSelect={(priority) => update({ priority })}>
        <Select.Button className="p-1 font-medium capitalize hover:bg-slate-200">
          <PriorityIcon priority={priority} />
          <span>{priority}</span>
        </Select.Button>
        <Select.Dropdown>
          {Object.values(IssuePriority).map((priority) => (
            <Select.Option key={priority} value={priority}>
              <PriorityIcon priority={priority} />
              <span className="rounded-md px-3 font-medium capitalize">
                {priority}
              </span>
            </Select.Option>
          ))}
        </Select.Dropdown>
      </Select>
    </div>
  );
};

const Estimate = ({
  estimate,
  update,
}: Pick<TIssue, "estimate"> & { update: (obj: Partial<TIssue>) => void }) => {
  return (
    <div className="mt-5">
      <label className="mb-2 text-sm text-slate-600">
        <p className="mb-2 font-medium">Original Estimate (hours)</p>
        <input
          value={estimate || ""}
          onChange={(ev) =>
            update({ estimate: ev.target.value ? +ev.target.value : null })
          }
          type="number"
          placeholder="Number"
          className="w-full rounded-md border border-slate-300 px-3 py-1"
        />
      </label>
    </div>
  );
};

const TimeTracking = ({
  estimate,
  timeRemaining,
  timeSpent,
  update,
}: Pick<TIssue, "estimate" | "timeRemaining" | "timeSpent"> & {
  update: (obj: Partial<TIssue>) => void;
}) => {
  function renderTrackingBar() {
    const progressWidth =
      ((timeSpent ?? 0) / (timeRemaining ?? estimate ?? 1)) * 100;

    return (
      <>
        <AiOutlineClockCircle size={25} />
        <div className="flex-1">
          <div className="relative h-1 overflow-hidden rounded-full bg-slate-300">
            <div
              style={{ width: `${progressWidth}%` }}
              className="absolute inset-0 right-auto bg-blue-600"
            />
          </div>
          <div className="mt-1 flex justify-between text-sm">
            <p>{timeSpent ? `${timeSpent}h logged` : "No time logged"}</p>
            <p>
              {timeRemaining
                ? `${timeRemaining}h remaining`
                : estimate
                ? `${estimate}h estimated`
                : null}
            </p>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-medium text-slate-600">Time Tracking</p>
      <Modal>
        <Modal.ToggleButton className="flex w-full items-center gap-2 rounded-md px-1 py-2 hover:bg-slate-100">
          {renderTrackingBar()}
        </Modal.ToggleButton>
        <Modal.Content>
          <header className="mb-4 flex justify-between">
            <p className="font-medium">Time tracking</p>
            <Modal.ToggleButton>
              <IoCloseOutline size={25} className="text-slate-500" />
            </Modal.ToggleButton>
          </header>
          <div className="mb-6 flex items-center gap-2">
            {renderTrackingBar()}
          </div>

          <div className="flex gap-2">
            <label className="mb-2 text-sm text-slate-600">
              <p className="mb-2 font-medium">Time spent (hours)</p>
              <input
                value={timeSpent || ""}
                onChange={(ev) =>
                  update({
                    timeSpent: ev.target.value ? +ev.target.value : null,
                  })
                }
                type="number"
                placeholder="Number"
                className="w-full rounded-md border border-slate-300 px-3 py-1"
              />
            </label>
            <label className="mb-2 text-sm text-slate-600">
              <p className="mb-2 font-medium">Time remaining (hours)</p>
              <input
                value={timeRemaining || ""}
                onChange={(ev) =>
                  update({
                    timeRemaining: ev.target.value ? +ev.target.value : null,
                  })
                }
                type="number"
                placeholder="Number"
                className="w-full rounded-md border border-slate-300 px-3 py-1"
              />
            </label>
          </div>
          <div>
            <Modal.ToggleButton className="float-right mt-4 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white">
              Done
            </Modal.ToggleButton>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};
