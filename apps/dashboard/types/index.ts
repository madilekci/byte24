import { IOption } from '@byte24/ui/interfaces';

export type INestedOption = IOption & {
  notSelectable?: boolean;
  options?: INestedOption[];
};
