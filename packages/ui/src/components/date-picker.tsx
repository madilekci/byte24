"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";

import { nl } from "date-fns/locale";
import { cn } from "@byte24/ui/utils";
import { Button } from "@byte24/ui/components/button";
import { Calendar } from "@byte24/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@byte24/ui/components/popover";

interface IDatePicker {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  withReset?: boolean;
  disablePastDates?: boolean;
  showOnlyWeekends?: boolean;
  disableWeekends?: boolean;
  disabled?: boolean;
  display?: boolean;
}

/**
 * @description
 * A date picker component that allows users to select a date from a calendar popup. It also supports an optional reset button to clear the selected date.
 * The selected date is displayed in a button, and the calendar popup can be triggered by clicking on the button.
 *
 * @component
 * @param {Object} props - The properties for the DatePicker component.
 * @param {Date | undefined} date - The currently selected date. If undefined, no date is selected.
 * @param {Function} setDate - A function to update the selected date.
 * @param {string} [placeholder='Select a date'] - A placeholder text displayed when no date is selected.
 * @param {string} [className] - Additional CSS classes to apply to the button.
 * @param {boolean} [withReset=false] - Whether to show a reset button to clear the selected date.
 * @param {boolean} [disabled=false] - Whether to disable the date picker.
 * @param {boolean} [display=false] - Whether to display the date picker value when disabled.
 */
export const DatePicker = ({
  date,
  className,
  placeholder,
  withReset,
  setDate,
  disablePastDates = true,
  showOnlyWeekends = false,
  disableWeekends = false,
  disabled = false,
  display = false,
}: IDatePicker) => {
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal text-sm",
            !date && "text-muted-foreground",
            display && "disabled:!opacity-80",
            disabled && "disabled:cursor-not-allowed",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: nl })
          ) : (
            <span>{placeholder}</span>
          )}
          {withReset ? (
            <button
              type="button"
              className="ml-auto"
              onClick={() => setDate(undefined)}
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        {!disabled && (
          <Calendar
            locale={nl}
            disablePastDates={disablePastDates}
            showOnlyWeekends={showOnlyWeekends}
            disableWeekends={disableWeekends}
            mode="single"
            selected={date}
            onSelect={(d: any) => setDate(d)}
            initialFocus
          />
        )}
      </PopoverContent>
    </Popover>
  );
};
