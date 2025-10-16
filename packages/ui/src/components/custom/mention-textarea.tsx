import { Textarea } from "@byte24/ui/components/textarea";
import { useEffect, useState } from "react";
import { Mention, MentionContent, MentionInput, MentionItem } from "../mention";
interface MentionTextareaProps {
  items: {
    id: string;
    label: string;
    value: string;
    subLabel?: string;
    disabled?: boolean;
    asChild?: boolean;
    children?: React.ReactNode[];
  }[];
  defaultSelectedValues?: string[];
  defaultInputValue?: string;
  trigger?: string;
  itemKey?: string;
  placeholder?: string;
  containerClassName?: string;
  textAreaClassName?: string;
  onSelectedValuesChange?: (value: string[]) => void;
  onInputValueChange?: (value: string) => void;
  onFilter?: (options: string[], term: string) => string[];
}
export const MentionTextarea = ({
  trigger = "@",
  itemKey = "user",
  placeholder = `Type @ om een ${itemKey} te selecteren...`,
  items,
  textAreaClassName,
  containerClassName,
  defaultInputValue,
  defaultSelectedValues,
  onFilter,
  onSelectedValuesChange,
  onInputValueChange,
}: MentionTextareaProps) => {
  // state
  const [inputValue, setInputValue] = useState(defaultInputValue);

  // useEffect
  useEffect(() => {
    setInputValue(defaultInputValue);
  }, [defaultInputValue]);

  return (
    <Mention
      value={defaultSelectedValues} // The currently selected values.
      inputValue={inputValue} // The current input value.
      onValueChange={(value) => {
        // Event handler called when a mention item is selected.
        onSelectedValuesChange?.(value);
      }}
      onInputValueChange={(value) => {
        // Event handler called when the input value changes.
        onInputValueChange?.(value);
        setInputValue(value);
      }}
      trigger={trigger}
      onFilter={onFilter}
      className={containerClassName || "w-full"}
    >
      <MentionInput placeholder={placeholder} asChild>
        <Textarea
          className={textAreaClassName || "w-full"}
          // defaultValue={inputValue}
          value={inputValue}
        />
      </MentionInput>
      <MentionContent>
        {items.map((item) => (
          <MentionItem
            key={item.id}
            label={item.label}
            value={item.value}
            disabled={item.disabled}
            asChild={item.asChild}
            className="flex cursor-pointer flex-col items-start hover:bg-gray-100"
          >
            <span className="text-sm">{item.label}</span>
            {item.subLabel && (
              <span className="text-muted-foreground text-xs">
                {item.subLabel}
              </span>
            )}
          </MentionItem>
        ))}
      </MentionContent>
    </Mention>
  );
};
