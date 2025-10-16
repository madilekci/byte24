import Show from "@byte24/ui/components/show";
import { User } from "@prisma/client";
import dayjs from "dayjs";
import { StatusBadge } from "./status-badge";
import { TranslateBadge } from "./translate-badge";
import AvatarGroup from "./avatar-group";

interface IStatusHistoryProps {
  statusHistory: {
    createdAt: Date;
    status?:
      | {
          name: string;
          color: string;
        }
      | string;
    byUser?: Partial<User>;
    createdBy?: Partial<User>;
  }[];
}

const StatusHistory = ({ statusHistory }: IStatusHistoryProps) => {
  // Check if statusHistory is an array
  const isArray = Array.isArray(statusHistory);

  // Ensure statusHistory is always an array
  const statusArray = isArray ? statusHistory : [statusHistory];
  return (
    <div>
      <ol className="relative border-gray-200 border-l dark:border-gray-700">
        {statusArray?.map((status: any, index) => (
          <li key={index} className="mb-6 ml-3">
            <div className="-left-1 absolute mt-2.5 h-2 w-2 rounded-full bg-gray-300" />
            <time className="mb-1 font-normal text-gray-500 text-xs leading-none">
              {dayjs(status?.createdAt).format("YYYY-MM-DD HH:mm")}
            </time>
            <div className="mt-2 flex items-center gap-x-1">
              <Show when={!!status?.status?.name}>
                <Show.If>
                  <StatusBadge color={status?.status?.color}>
                    {status?.status?.name}
                  </StatusBadge>
                </Show.If>
                <Show.Else>
                  <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                    <TranslateBadge
                      type={status?.status?.name || status?.status}
                    />
                  </h3>
                </Show.Else>
              </Show>
              <Show when={!!status?.byUser}>
                <div className="font-normal text-gray-600 text-xs">
                  door{" "}
                  <AvatarGroup
                    users={[status?.byUser]}
                    size="sm"
                    className="mr-1 inline"
                  />{" "}
                  {status?.byUser?.firstName} {status?.byUser?.lastName}
                </div>
              </Show>
              <Show when={!!status?.createdBy}>
                <div className="font-normal text-gray-600 text-xs">
                  door{" "}
                  <AvatarGroup
                    users={[status?.createdBy]}
                    size="sm"
                    className="mr-1 inline"
                  />{" "}
                  {status?.createdBy?.firstName} {status?.createdBy?.lastName}
                </div>
              </Show>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default StatusHistory;
