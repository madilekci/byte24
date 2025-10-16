import React, { createContext, useContext, useMemo } from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSortableTableContext } from "./sortable-context";
import { GripVertical } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

interface Props {
  id: UniqueIdentifier;
  className?: string;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableTableRowContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

export function SortableTableRow({
  children,
  id,
  className,
}: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableTableRowContext.Provider value={context}>
      <tr
        className={cn("SortableTableRow", className)}
        ref={setNodeRef}
        style={style}
      >
        {children}
      </tr>
    </SortableTableRowContext.Provider>
  );
}

export function DragHandle({ className = "" }: { className?: string }) {
  const { attributes, listeners, ref } = useContext(SortableTableRowContext);
  const { disabled } = useSortableTableContext();

  return (
    <button
      className={`p-1 rounded hover:bg-gray-200 transition-colors ${
        disabled ? "cursor-default opacity-50" : "cursor-grab"
      } ${className}`}
      {...(disabled ? {} : attributes)}
      {...(disabled ? {} : listeners)}
      ref={ref}
      disabled={disabled}
      type="button"
    >
      <GripVertical className="h-4 w-4 text-gray-500" />
    </button>
  );
}
