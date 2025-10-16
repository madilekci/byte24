export interface DataTableView {
  name: string;
  defaultView: boolean;
  selected: boolean;
  params: string;
  columnPreferences?: {
    visibility: { [key: string]: boolean };
    order: string[];
  };
  createdBy?: string;
  isShared?: boolean;
}
