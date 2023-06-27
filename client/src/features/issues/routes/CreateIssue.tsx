import { Select } from "@/components/select";
import { CreateIssueDto } from "../types";
import { IssuePriority, IssueType } from "../constants";
import { useRef, useState } from "react";
import { useAuth } from "@/features/auth";
import { TypeIcon } from "../components/TypeIcon";
import { Avatar, TUser, useUsers } from "@/features/users";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { Divider } from "@/components/elements";
import { TextEditor } from "../components/TextEditor";
import { useNavigate, useParams } from "react-router";
import { PriorityIcon } from "../components/PriorityIcon";
import { useCreateIssue } from "../hooks";
import { useClickOutside } from "@/hooks";
import Spinner from "@/components/elements/Spinner";

export const CreateIssue = () => {
  const { currentUser } = useAuth();
  const projectId = useParams().projectId as string;
  const ref = useRef<HTMLFormElement | null>(null);
  const [data, setData] = useState<CreateIssueDto>({
    type: IssueType.TASK,
    summary: "",
    description: "",
    reporter: currentUser as TUser,
    assignees: [],
    priority: IssuePriority.MEDIUM,
  });
  const mutation = useCreateIssue(projectId);
  const navigate = useNavigate();

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    await mutation.mutateAsync(data);
    navigate(-1);
  };

  const onCancel = () => {
    navigate(-1);
  };

  const update = (updatedData: Partial<CreateIssueDto>) => {
    setData((prev) => ({ ...prev, ...updatedData }));
  };

  useClickOutside(ref, onCancel);

  return (
    <div className="fixed inset-0 z-[1000] overflow-scroll bg-black/50 p-12">
      <form
        ref={ref}
        onSubmit={onSubmit}
        className="mx-auto w-full max-w-[50rem] rounded-md bg-white p-6"
      >
        <h2 className="text-xl text-slate-700">Create issue</h2>
        <TypeSelect type={data.type} update={update} />
        <Divider />
        <SummaryField summary={data.summary} update={update} />
        <DescriptionField description={data.description} update={update} />
        <ReporterSelect
          reporter={data.reporter}
          update={update}
          projectId={projectId}
        />
        <AssigneesSelect
          assignees={data.assignees}
          update={update}
          projectId={projectId}
        />
        <PrioritySelect priority={data.priority} update={update} />
        <FormFooter onCancel={onCancel} isLoading={mutation.isLoading} />
      </form>
    </div>
  );
};

const TypeSelect = ({
  type,
  update,
}: {
  type: IssueType;
  update: (obj: Partial<CreateIssueDto>) => void;
}) => {
  return (
    <div className="my-5">
      <p className="mb-1 text-sm font-medium text-slate-600">Issue Type</p>
      <Select selected={type} onSelect={(type) => update({ type })}>
        <Select.Button className="flex w-full items-center justify-between border border-slate-300 bg-slate-50 px-4 py-2 hover:bg-slate-100">
          <div className="flex items-center gap-2">
            <TypeIcon type={type} />
            <span className="text-sm capitalize text-slate-600">{type}</span>
          </div>
          <IoIosArrowDown />
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
    </div>
  );
};

const SummaryField = ({
  summary,
  update,
}: {
  summary: string;
  update: (obj: Partial<CreateIssueDto>) => void;
}) => {
  return (
    <div className="my-5">
      <p className="mb-1 text-sm font-medium text-slate-600">Short Summary</p>
      <input
        type="text"
        value={summary}
        onChange={(ev) => update({ summary: ev.target.value })}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800"
      />
    </div>
  );
};

const DescriptionField = ({
  description,
  update,
}: {
  description: string;
  update: (obj: Partial<CreateIssueDto>) => void;
}) => {
  return (
    <div className="my-5">
      <p className="mb-1 text-sm font-medium text-slate-600">Short Summary</p>
      <TextEditor
        text={description}
        setText={(description) => update({ description })}
      />
    </div>
  );
};

const ReporterSelect = ({
  reporter,
  update,
  projectId,
}: {
  reporter: TUser;
  projectId: string;
  update: (obj: Partial<CreateIssueDto>) => void;
}) => {
  const { data: users } = useUsers({ projectId });
  return (
    <div className="my-5">
      <p className="mb-1 text-sm font-medium text-slate-600">Reporter</p>
      <Select
        selected={String(reporter.id)}
        onSelect={(reporterId) =>
          update({
            reporter: users?.find((user) => reporterId === String(user.id)),
          })
        }
      >
        <Select.Button className="flex w-full items-center justify-between border border-slate-300 bg-slate-50 px-4 py-2 hover:bg-slate-100">
          <div className="flex items-center gap-2">
            <Avatar avatarUrl={reporter.avatarUrl} size="sm" />
            <span>{reporter.name}</span>
          </div>
          <IoIosArrowDown />
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

const AssigneesSelect = ({
  assignees,
  update,
  projectId,
}: {
  assignees: TUser[];
  projectId: string;
  update: (obj: Partial<CreateIssueDto>) => void;
}) => {
  const { data: users } = useUsers({ projectId });

  return (
    <div className="my-5">
      <p className="mb-1 text-sm font-medium text-slate-600">Assignees</p>
      <Select
        selected={assignees.map(({ id }) => String(id))}
        onSelect={(ids) =>
          update({
            assignees: users?.filter((user) => ids.includes(String(user.id))),
          })
        }
      >
        <div>
          <Select.Button className="flex w-full items-center justify-between border border-slate-300 bg-slate-50 px-4 py-2 hover:bg-slate-100">
            {assignees.length > 0 ? (
              <div className="flex items-center gap-2">
                {assignees.map((assignee) => {
                  return (
                    <span
                      key={assignee.id}
                      onClick={(ev) => ev.stopPropagation()}
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
                <span className="font-medium text-blue-700">+ Add more</span>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-between">
                <p className="text-slate-500">Select</p>
                <IoIosArrowDown />
              </div>
            )}
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

const PrioritySelect = ({
  priority,
  update,
}: {
  priority: IssuePriority;
  update: (obj: Partial<CreateIssueDto>) => void;
}) => {
  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-medium text-slate-600">Priority</p>
      <Select selected={priority} onSelect={(priority) => update({ priority })}>
        <Select.Button className="flex w-full items-center justify-between border border-slate-300 bg-slate-50 px-4 py-2 hover:bg-slate-100">
          <div className="flex items-center gap-2">
            <PriorityIcon priority={priority} />
            <span>{priority}</span>
          </div>
          <IoIosArrowDown />
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

const FormFooter = ({
  onCancel,
  isLoading,
}: {
  onCancel: () => void;
  isLoading: boolean;
}) => {
  return (
    <div className="mt-12 flex justify-end gap-2">
      <button
        className="flex items-center rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white"
        disabled={isLoading}
      >
        {isLoading && <Spinner />}
        Create Issue
      </button>
      <button
        onClick={onCancel}
        type="button"
        className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200"
      >
        Cancel
      </button>
    </div>
  );
};
