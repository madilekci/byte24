'use client';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@byte24/ui/components/form';
import { Input } from '@byte24/ui/components/input';
import { useEffect, useReducer } from 'react';
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';

type TextInputProps<T extends FieldValues> = {
  form: UseFormReturn<T, any, undefined>;
  name: Path<T>;
  label: string;
  placeholder: string;
};

// Brazilian currency config
const moneyFormatter = Intl.NumberFormat('nl-NL', {
  currency: 'EUR',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const MoneyInput = <T extends FieldValues>(props: TextInputProps<T>) => {
  const initialValue = props.form.getValues()[props.name]
    ? moneyFormatter.format(props.form.getValues()[props.name])
    : '';

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, '');
    return moneyFormatter.format(Number(digits) / 100);
  }, initialValue);

  function handleChange(realChangeFn: Function, formattedValue: string) {
    const digits = formattedValue.replace(/\D/g, '');
    const realValue = Number(digits) / 100;
    realChangeFn(`${realValue}`);
  }

  useEffect(() => {
    const formValue = props.form.getValues()[props.name];
    if (formValue && formValue !== value) {
      setValue(moneyFormatter.format(formValue));
    }
  }, [props.form.getValues()[props.name]]);

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        field.value = value as PathValue<T, Path<T>>;
        const _change = field.onChange;

        return (
          <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={props.placeholder}
                type='text'
                {...field}
                onChange={(ev) => {
                  setValue(ev.target.value);
                  handleChange(_change, ev.target.value);
                }}
                value={value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
