import { createContext, useContext } from "react";

export const SortableTableContext = createContext<{ disabled: boolean }>({
  disabled: false,
});

export const useSortableTableContext = () => useContext(SortableTableContext);
