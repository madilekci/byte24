import React from "react";

import { Button } from "@byte24/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@byte24/ui/components/dropdown-menu";
import Show from "@byte24/ui/components/show";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import Link from "next/link";

// UI CHANGES
// Add download stuff

interface ActionsDropdownProps {
  width?: string;
  items: {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: (e?: React.MouseEvent) => void;
    omit?: boolean;
    download?: boolean | string;
    disabled?: boolean;
    target?: string;
  }[];
  iconDirection?: "horizontal" | "vertical";
  buttonClassName?: string;
  title?: string;
}

/**
 * @description
 * A reusable dropdown menu component that renders a list of actions or links.
 * The dropdown can display items with icons, handle onClick events, or navigate to links.
 *
 * @component
 * @param {string} [width] - Custom width of the dropdown menu content. Defaults to `w-48`.
 * @param {Object[]} items - Array of action items to display in the dropdown.
 * @param {string} items[].label - The label text for the menu item.
 * @param {React.ReactNode} [items[].icon] - An optional icon to display next to the label.
 * @param {string} [items[].href] - A URL to navigate to when the menu item is clicked.
 * @param {Function} [items[].onClick] - Callback function to execute when the menu item is clicked.
 * @param {boolean} [items[].omit] - If true, this item will be omitted from the menu.
 * @param {boolean} [items[].download] - If true, the link will trigger a file download.
 * @param {boolean} [items[].disabled] - If true, the menu item will be disabled and not clickable.
 * @param {('horizontal'|'vertical')} [iconDirection='horizontal'] - The direction of the trigger button icon (horizontal or vertical).
 * @param {string} [buttonClassName] - Additional class names for styling the trigger button.
 * @param {string} [title] - Header title of the dropdown menu
 */
export function ActionsDropdown({
  width,
  items,
  iconDirection = "horizontal",
  buttonClassName,
  title,
}: ActionsDropdownProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={`h-8 w-8 p-0 ${buttonClassName}`}>
          <span className="sr-only">Open menu</span>
          {iconDirection === "horizontal" && (
            <MoreHorizontal className="h-4 w-4" />
          )}
          {iconDirection === "vertical" && <MoreVertical className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={`${width ?? "w-48"}`}>
        <Show when={!!title}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
        </Show>
        {items.map((item, index) => {
          return item.omit ? null : item?.href ? (
            <DropdownMenuItem asChild key={index}>
              <Link
                href={item?.href}
                onClick={item?.onClick}
                className={
                  "flex w-full gap-x-2 font-normal text-sm hover:font-medium"
                }
                download={item?.download}
                target={item?.target}
              >
                {item?.icon && item?.icon}
                {item.label}
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              key={index}
              onClick={item?.onClick ? item?.onClick : () => {}}
              disabled={item.disabled}
              className={
                "flex w-full gap-x-2 font-normal text-sm hover:font-medium"
              }
            >
              {item?.icon && item?.icon}
              {item.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
