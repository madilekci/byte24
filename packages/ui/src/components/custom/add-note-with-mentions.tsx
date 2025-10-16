import { XCircle } from "lucide-react";

import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@byte24/ui/components/card";

import { Button } from "@byte24/ui/components/button";
import { Card } from "@byte24/ui/components/card";
import { Edit } from "lucide-react";
import { MentionTextarea } from "./mention-textarea";

interface AddNoteWithMentionsProps {
  isSubmitting: boolean;
  items: {
    id: string;
    label: string;
    value: string;
    subLabel?: string;
  }[];
  title?: string;
  actions?: {
    cancel: {
      label: string;
      className?: string;
    };
    submit: {
      label: string;
      className?: string;
    };
  };
  inputValue?: any;
  selectedValues?: string[];
  reset: () => void;
  onSubmit: () => void;
  setSelectedValues: (value: string[]) => void;
  setInputValue: (value: string) => void;
}
export const AddNoteWithMentions = ({
  isSubmitting,
  items,
  title,
  actions,
  inputValue,
  selectedValues,
  onSubmit,
  reset,
  setSelectedValues,
  setInputValue,
}: AddNoteWithMentionsProps) => {
  return (
    <>
      {/* add new note card */}
      <Card className="mb-5 w-3/4">
        <CardHeader>
          <CardTitle>{title ?? "Notitie toevoegen"}</CardTitle>
        </CardHeader>
        <CardContent>
          <MentionTextarea
            items={items}
            defaultInputValue={inputValue ?? ""}
            defaultSelectedValues={selectedValues ?? []}
            onInputValueChange={setInputValue}
            onSelectedValuesChange={setSelectedValues}
          />

          <CardFooter className="mt-5 flex flex-col items-center justify-end gap-4 lg:flex-row">
            <Button
              type="button"
              variant="secondary"
              size={"sm"}
              disabled={isSubmitting}
              onClick={() => {
                reset();
                setSelectedValues([]);
                setInputValue("");
              }}
              className={actions?.cancel.className}
            >
              <XCircle className="mr-2 h-5 w-5" />
              {actions?.cancel.label ?? "Formulier wissen"}
            </Button>

            <Button
              type="button"
              size={"sm"}
              disabled={isSubmitting}
              className={actions?.submit.className}
              onClick={() => onSubmit()}
            >
              {actions?.submit.label ?? "Toevoegen"}{" "}
              <Edit className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </>
  );
};
