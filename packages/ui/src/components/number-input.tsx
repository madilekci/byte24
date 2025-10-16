import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
  InputBaseInput,
} from "@repo/ui/components/input-base";
import {
  InputAttributes,
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";
import {
  ControlGroup,
  ControlGroupItem,
} from "@repo/ui/components/control-group";
import React, { useEffect, useState } from "react";
import { cn, Input } from "@byte24/ui";

type NumberInputProps<BaseType = InputAttributes> = Omit<
  NumericFormatProps<BaseType>,
  "onBlur"
> & {
  numberFormat: {
    thousandSeparator?: string;
    decimalSeparator?: string;
  };
  onBlur?: (values: NumberFormatValues | null) => void;
  prefix?: string;
  prefixComponent?: React.ReactElement;
  noPrefix?: boolean;
};

export const NumberInput = <
  BaseType extends InputAttributes = InputAttributes,
>({
  value,
  numberFormat,
  onBlur,
  onValueChange,
  prefix,
  prefixComponent,
  disabled,
  noPrefix,
  ...props
}: NumberInputProps<BaseType>) => {
  const [_value, _setValue] = useState(value);
  const [values, setValues] = useState<NumberFormatValues>();

  useEffect(() => {
    _setValue(value);
  }, [value]);

  return (
    <ControlGroup>
      {!noPrefix && (
        <InputBase
          className={cn("rounded-r-none", {
            "p-0": !!prefixComponent,
          })}
        >
          <InputBaseAdornment className="pointer-events-auto">
            {prefixComponent ?? prefix ?? "€"}
          </InputBaseAdornment>
        </InputBase>
      )}
      <ControlGroupItem>
        <NumericFormat
          value={_value}
          onValueChange={(values, sourceInfo) => {
            setValues(values);
            onValueChange?.(values, sourceInfo);
          }}
          onBlur={(e) => {
            onBlur?.(values ?? null);
          }}
          thousandSeparator={numberFormat.thousandSeparator}
          decimalSeparator={numberFormat.decimalSeparator}
          decimalScale={2}
          fixedDecimalScale={false}
          allowNegative={false}
          customInput={Input}
          className="rounded-l-none"
          disabled={disabled}
          placeholder={props.placeholder}
          max={props.max}
          min={props.min}
        />
      </ControlGroupItem>
    </ControlGroup>
  );
};
