"use client";

import { Input } from "@byte24/ui/components/input";
import { useState, useEffect } from "react";

interface DurationInputProps {
  value?: string; // "HH:MM"
  onChange: (duration: string) => void;
  className?: string;
  disabled?: boolean;
  display?: boolean;
}

export const DurationInput = ({
  value,
  onChange,
  className = "",
  disabled = false,
  display = false,
}: DurationInputProps) => {
  const [duration, setDuration] = useState(value ?? "");

  useEffect(() => {
    setDuration(value ?? "");
  }, [value]);

  const handleDurationChange = (raw: string) => {
    // Allow only digits and colon while typing
    const cleaned = raw.replace(/[^0-9:]/g, "");
    setDuration(cleaned);
    onChange(cleaned);
  };

  const handleBlur = () => {
    if (!duration) return;

    if (!duration.includes(":")) {
      // No colon → treat entire input as hours, add ":00"
      const rawHours = duration.replace(/[^0-9]/g, "");
      const trimmedHours = rawHours.replace(/^0+/, "");
      const allZeros = trimmedHours === "";

      let hours = "";
      if (allZeros) {
        hours = "00";
      } else if (trimmedHours.length === 1) {
        hours = trimmedHours.padStart(2, "0");
      } else {
        hours = trimmedHours;
      }

      const newDuration = `${hours}:00`;
      setDuration(newDuration);
      onChange(newDuration);
    } else {
      // Existing logic if colon present
      const parts = duration.split(":");

      let hours = parts[0];
      let minutes = parts[1];

      if (minutes.length < 2) {
        minutes = minutes.padStart(2, "0");
      }

      const trimmedHours = hours.replace(/^0+/, "");
      const allZeros = trimmedHours === "";

      if (allZeros) {
        hours = "00";
      } else if (trimmedHours.length === 1) {
        hours = trimmedHours.padStart(2, "0");
      } else {
        hours = trimmedHours;
      }

      const newDuration = `${hours}:${minutes}`;
      setDuration(newDuration);
      onChange(newDuration);
    }
  };

  return (
    <Input
      type="text"
      value={duration}
      onChange={(e) => handleDurationChange(e.target.value)}
      onBlur={handleBlur}
      placeholder="00:00"
      className={`w-24 bg-background text-center ${className}`}
      disabled={disabled}
      display={display}
      maxLength={6}
    />
  );
};
