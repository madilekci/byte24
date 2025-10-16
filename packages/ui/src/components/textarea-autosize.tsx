import * as React from "react";

import { cn } from "@repo/ui/lib/utils";
import TextareaAutosizeComponent, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

interface TextareaAutosizeComponentProps
  extends Omit<TextareaAutosizeProps, "value"> {
  mutable?: boolean;
  value?: React.InputHTMLAttributes<HTMLTextAreaElement>["value"] | null;
}

const TextareaAutosize = React.forwardRef<
  HTMLTextAreaElement,
  TextareaAutosizeComponentProps
>(({ className, value, mutable, ...props }, ref) => {
  return (
    <TextareaAutosizeComponent
      className={cn(
        "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80",
        className
      )}
      {...(!mutable
        ? {
            value: value || "",
          }
        : {})}
      ref={ref}
      {...props}
    />
  );
}) as React.ForwardRefExoticComponent<
  TextareaAutosizeComponentProps & React.RefAttributes<HTMLTextAreaElement>
>;

TextareaAutosize.displayName = "Textarea";

export { TextareaAutosize };
