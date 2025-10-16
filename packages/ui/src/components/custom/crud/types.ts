export interface Field<T> {
  key: string;
  label: string;
  description?: string;
  accessorFn?: (row: T) => string;
  type: 'text' | 'number' | 'email' | 'date' | 'select' | 'color' | 'checkbox';
  options?: { label: string; value: string | number }[];
  required?: boolean;
  step?: number;
  disabled?: boolean;
}

// Type to extract the value type based on the key
export type FieldKey<T> = keyof Field<T>;
export type GetReturnType<T, K extends FieldKey<T>> = K extends FieldKey<T> ? Field<unknown>[K] : never;

export interface BaseData {
  id: number;
  isSystemRequired?: boolean;
  isDefault?: boolean;
  [key: string]: any;
}