import { createContext, useContext } from "react";

export const SortableListContext = createContext<{ disabled: boolean }>({
  disabled: false,
});

export const useSortableListContext = () => useContext(SortableListContext);
