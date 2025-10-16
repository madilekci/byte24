"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@byte24/ui/components/avatar";
import {
  AvatarGroup as AvatarGroupComponent,
  AvatarGroupTooltip,
} from "./ui/shadcn-io/avatar-group";
import { cn } from "@byte24/ui/utils";

interface AvatarUser {
  image?: string | null;
  name?: string;
}

interface AvatarGroupTooltipProps {
  side?: "top" | "bottom" | "left" | "right";
}

interface AvatarGroupProps {
  users: AvatarUser[];
  className?: string;
  avatarClassName?: string;
  tooltip?: AvatarGroupTooltipProps;
  size?: keyof typeof AVATAR_SIZES;
}
export const AvatarGroup = ({
  users,
  className,
  avatarClassName,
  tooltip,
  size,
}: AvatarGroupProps) => {
  return (
    <AvatarGroupComponent
      variant="motion"
      className={cn("-space-x-3", className)}
      translate={0}
    >
      {users.map((user, index) => {
        return (
          <AvatarGroupItem
            key={index}
            user={user}
            tooltip={tooltip}
            className={avatarClassName}
            size={size}
          />
        );
      })}
    </AvatarGroupComponent>
  );
};

const AVATAR_SIZES = {
  sm: "size-4 text-[0.4rem]",
  md: "size-8 text-[0.6rem]",
  lg: "size-10",
  xl: "size-12",
};

interface AvatarGroupItemProps {
  user: AvatarUser;
  tooltip?: {
    side?: "top" | "bottom" | "left" | "right";
  };
  className?: string;
  size?: keyof typeof AVATAR_SIZES;
}
export const AvatarGroupItem = ({
  user,
  tooltip,
  className,
  size = "lg",
}: AvatarGroupItemProps) => {
  const nameWords = user?.name?.split(" ").filter((word) => word.length > 0);
  const fallback =
    nameWords?.length && nameWords?.length > 1
      ? nameWords?.[0]?.[0] + nameWords?.[nameWords?.length - 1]?.[0]
      : nameWords?.[0]?.[0] || "";
  return (
    <Avatar
      className={cn(
        "border-3 border-background",
        className,
        AVATAR_SIZES?.[size]
      )}
    >
      {user?.image && <AvatarImage src={user?.image} />}
      <AvatarFallback>{fallback}</AvatarFallback>
      <AvatarGroupTooltip {...tooltip}>
        <p>{user?.name}</p>
      </AvatarGroupTooltip>
    </Avatar>
  );
};

export default AvatarGroup;
