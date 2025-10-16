'use client';
import { Input } from '@repo/ui/components/input';
import { useEffect, useState } from 'react';

type MoneyInputProps = {
  defaultValue?: number;
  onBlur?: (value: number | null) => void;
  placeholder?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
};

const moneyFormatter = Intl.NumberFormat('nl-NL', {
  currency: 'EUR',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const MoneyInputUncontrolled = ({
  defaultValue,
  onBlur,
  placeholder,
  className,
  disabled,
}: MoneyInputProps) => {
  const [value, setValue] = useState(
    defaultValue != null || defaultValue !== undefined ? moneyFormatter.format(defaultValue) : ''
  );

  useEffect(() => {
    setValue(
      defaultValue != null || defaultValue !== undefined ? moneyFormatter.format(defaultValue) : ''
    );
  }, [defaultValue]);

  function formatValue(value: string) {
    const digits = value.replace(/\D/g, '');
    return moneyFormatter.format(Number(digits) / 100);
  }

  return (
    <Input
      placeholder={placeholder}
      type='text'
      value={value}
      onChange={(ev) => {
        const input = ev.target as HTMLInputElement;
        const formattedValue = formatValue(input.value);
        setValue(formattedValue);
      }}
      onBlur={(ev) => {
        if (ev.target.value === null || ev.target.value === undefined || ev.target.value === '')
          onBlur?.(null);
        const formattedValue = formatValue(ev.target.value);
        ev.target.value = formattedValue;
        const digits = formattedValue.replace(/\D/g, '');
        const realValue = Number(digits) / 100;
        onBlur?.(realValue);
      }}
      className={className}
      disabled={disabled}
    />
  );
};
