import { SelectOption } from '@byte24/api';

export type NestedSelectOption = SelectOption & {
  notSelectable?: boolean;
  options?: NestedSelectOption[];
};

export type SelectOptionApi = {
  id: number | string;
  name: string;
  meta?: any;
};