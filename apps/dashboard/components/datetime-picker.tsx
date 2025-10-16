"use client";

import { DatePicker } from "@byte24/ui";
import { Input } from "@byte24/ui/components/input";
import dayjs from "dayjs";

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  className?: string;
  disablePastDates?: boolean;
  placeholder?: string;
  disabled?: boolean;
  display?: boolean;
  reverse?: boolean;
}

export const DateTimePicker = ({
  value,
  onChange,
  className = "",
  disablePastDates = false,
  placeholder,
  disabled = false,
  display = false,
  reverse = false,
}: DateTimePickerProps) => {
  const currentTime = value ? dayjs(value).format("HH:mm") : "";

  return (
    <div
      className={`flex gap-2 ${className} ${reverse ? "flex-row-reverse" : ""}`}
    >
      <DatePicker
        className="w-52"
        setDate={(e) => {
          const currentValue = value ? dayjs(value) : dayjs();
          const newDate = dayjs(e);
          const combinedDateTime = currentValue
            .year(newDate.year())
            .month(newDate.month())
            .date(newDate.date());
          onChange(combinedDateTime.toDate());
        }}
        date={value ?? undefined}
        disablePastDates={disablePastDates}
        placeholder={placeholder}
        disabled={disabled}
        display={display}
      />
      <Input
        type="time"
        value={currentTime}
        onChange={(e) => {
          const currentValue = value ? dayjs(value) : dayjs();
          const [hours, minutes] = e.target.value.split(":");
          const combinedDateTime = currentValue
            .hour(parseInt(hours) || 0)
            .minute(parseInt(minutes) || 0)
            .second(0)
            .millisecond(0);
          onChange(combinedDateTime.toDate());
        }}
        className="w-18 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        disabled={disabled}
        display={display}
      />
    </div>
  );
};
