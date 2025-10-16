import React, { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import type { Active, UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { SortableTableRow, DragHandle } from "./sortable-table-row";
import { SortableOverlay } from "./sortable-overlay";
import { SortableTableContext } from "./sortable-context";

export { useSortableTableContext } from "./sortable-context";

interface BaseItem {
  id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
  items: T[];
  onChange(items: T[]): void;
  renderItem(item: T): ReactNode;
  disabled?: boolean;
  children?: ReactNode;
}

export function SortableTable<T extends BaseItem>({
  items,
  onChange,
  renderItem,
  disabled = false,
  children,
}: Props<T>) {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <SortableTableContext.Provider value={{ disabled }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }) => {
          if (!disabled) {
            setActive(active);
          }
        }}
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over?.id && !disabled) {
            const activeIndex = items.findIndex(({ id }) => id === active.id);
            const overIndex = items.findIndex(({ id }) => id === over.id);

            onChange(arrayMove(items, activeIndex, overIndex));
          }
          setActive(null);
        }}
        onDragCancel={() => {
          setActive(null);
        }}
      >
        <SortableContext items={items}>
          <tbody className="w-full">
            {children}
            {items.map((item) => (
              <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
            ))}
          </tbody>
        </SortableContext>
        {typeof document !== "undefined" &&
          createPortal(
            <SortableOverlay>
              {activeItem ? renderItem(activeItem) : null}
            </SortableOverlay>,
            document.body
          )}
      </DndContext>
    </SortableTableContext.Provider>
  );
}

SortableTable.Row = SortableTableRow;
SortableTable.DragHandle = DragHandle;
