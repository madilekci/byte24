import { cn } from "@byte24/ui";
import * as React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"] | null;
  mutable?: boolean;
  display?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, mutable, display, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          display ? "disabled:opacity-80" : "disabled:opacity-50"
        )}
        {...(!mutable
          ? {
              value:
                type == "number"
                  ? value === null
                    ? undefined
                    : value
                  : value || "",
            }
          : {})}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
