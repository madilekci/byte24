"use client";

import { X } from "lucide-react";
import * as React from "react";

import { Badge } from "@byte24/ui/components/badge";
import {
  Command,
  CommandEmpty,
  CommandList,
} from "@byte24/ui/components/command";
import { useDebounce } from "@byte24/ui/hooks";
import { Command as CommandPrimitive } from "cmdk";

import { Icons } from "@byte24/ui/components/icons";
import { IOption } from "@byte24/ui/interfaces";
import { UseQueryResult } from "@tanstack/react-query";
import clsx from "clsx";

interface SearchMultiSelectAsyncProps {
  //list: List[];
  selected: IOption[];
  setSelected: React.Dispatch<React.SetStateAction<IOption[]>>;
  label?: string;
  searchText?: string;
  noResultText?: string;
  useFetch: (debounceValue?: string) => UseQueryResult<IOption[]>;
  defaultSelectedIds?: number[];
  forceSingleSelect?: boolean;
  dependencyArray?: any[];
  formatOption?: (option: IOption) => string;
  extraName?: (option: IOption) => string;
  extraNameSpecial?: (option: IOption) => React.ReactNode | string;
  preRequisites?: (() => boolean)[];
  preRequisiteText?: string;
  includeExtraNameInSelected?: boolean;
  onBlur?: (values: IOption[]) => void;
  className?: string;
  selectClassName?: string;
  optionsClassName?: string;
  disabled?: boolean;
}

// const SearchMultiSelectAsync = () => {
//   return (
//     <Command className='rounded-lg border shadow-md'>
//       <CommandInput placeholder='Type a command or search...' />
//       <CommandList></CommandList>
//     </Command>
//   );
// };

export const SearchMultiSelectAsync = ({
  //list,
  selected,
  setSelected,
  onBlur,
  label,
  noResultText = "Geen resultaten...",
  searchText = "Zoek bedrijven...",
  formatOption,
  extraName,
  extraNameSpecial,
  useFetch,
  defaultSelectedIds,
  forceSingleSelect = false,
  includeExtraNameInSelected = false,
  preRequisites = [],
  preRequisiteText = "Voorwaarden niet voldaan...",
  dependencyArray = [],
  className,
  selectClassName,
  optionsClassName,
  disabled,
}: SearchMultiSelectAsyncProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  const [query, setQuery] = React.useState("");
  const debounceValue = useDebounce(query, 500);

  const allPreRequisitesMet = preRequisites?.every((prerequisite) =>
    prerequisite()
  );

  const { data: options, refetch } = useFetch(
    allPreRequisitesMet ? debounceValue : ""
  );
  React.useEffect(() => {
    if (allPreRequisitesMet) {
      refetch();
    } else {
      setSelected([]);
    }
  }, [allPreRequisitesMet, refetch]);

  React.useEffect(() => {
    if (defaultSelectedIds && defaultSelectedIds?.length > 0) {
      const defaultSelected = options?.filter((option) =>
        defaultSelectedIds?.includes(option.id)
      );

      if (defaultSelected) setSelected(defaultSelected);
    }
  }, [options]);

  // React.useEffect(() => {
  //   onSearch(query).then((data) => {
  //     setOptions(data);

  //     if (defaultSelectedIds && defaultSelectedIds?.length > 0) {
  //       const defaultSelected = data?.filter((option) =>
  //         defaultSelectedIds?.includes(option.id)
  //       );

  //       if (defaultSelected) setSelected((prev) => defaultSelected);
  //     }
  //   });
  // }, dependencyArray);

  // React.useEffect(() => {
  //   onSearch(debounceValue).then((data) => setOptions(data));
  // }, [debounceValue]);

  const handleUnselect = React.useCallback((item: IOption) => {
    setSelected((prev) => {
      const newSelected = prev.filter((s) => s.id !== item.id);
      onBlur?.(newSelected);
      return newSelected;
    });
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      try {
        const input = inputRef.current;
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (input.id === "") {
              setSelected((prev) => {
                const newSelected = [...prev];
                newSelected.pop();
                onBlur?.(newSelected);

                return newSelected;
              });
            }
          }
          // This is not a default behaviour of the <input /> field
          if (e.key === "Escape") {
            input.blur();
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    []
  );

  const selectedIds = React.useMemo(
    () => selected?.map((item) => item.id) ?? [],
    [selected, preRequisites, allPreRequisitesMet, debounceValue]
  );

  const selectables = React.useMemo(
    () => options?.filter((item) => !selectedIds?.includes(item?.id)) ?? [],
    [options, selectedIds, preRequisites, allPreRequisitesMet, debounceValue]
  );

  const isLoading = React.useMemo(
    () => debounceValue !== query && allPreRequisitesMet,
    [debounceValue, query]
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={clsx("overflow-visible bg-transparent", className)}
    >
      {label && (
        <label className="block pb-2 font-medium text-gray-700 text-sm">
          {label}
        </label>
      )}
      {/* <CommandInput placeholder='Type a command or search...' /> */}
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
        <div
          className={clsx(
            "scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 flex flex-wrap gap-1 overflow-y-auto",
            selectClassName
          )}
        >
          {selected.map((item) => {
            return (
              <Badge key={item.id} variant="secondary">
                <div>
                  {item.name}
                  {formatOption ? formatOption(item) : item.description}
                  {includeExtraNameInSelected && extraNameSpecial ? (
                    <> {extraNameSpecial(item)}</>
                  ) : extraName ? (
                    <>
                      {" "}
                      - <span className="font-semibold">{extraName(item)}</span>
                    </>
                  ) : null}
                </div>
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
        </div>
        {/* Avoid having the "Search" Icon */}
        <CommandPrimitive.Input
          ref={inputRef}
          id={query}
          disabled={disabled}
          onValueChange={setQuery}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          placeholder={searchText ?? ""}
          className="active: ml-2 flex-1 bg-transparent outline-none ring-0 placeholder:text-muted-foreground active:outline-none"
        />
      </div>
      <CommandList></CommandList>
      <div
        className={clsx("relative", {
          "mt-2": isLoading || (open && selectables.length > 0),
        })}
      >
        <div
          className={clsx(
            {
              "border-transparent": !(
                isLoading ||
                (open && selectables.length > 0)
              ),
            },
            "absolute top-0 z-10 w-full animate-in rounded-md border bg-popover text-popover-foreground shadow-md outline-none"
          )}
        >
          {isLoading ? (
            <Icons.spinner className="mx-auto my-2 h-6 w-6 fill-primary" />
          ) : open && !allPreRequisitesMet ? (
            <CommandEmpty className="h-full max-h-[250px] px-2 py-1.5">
              <span className="text-gray-400 text-sm italic">
                {preRequisiteText}
              </span>
            </CommandEmpty>
          ) : open && selectables.length === 0 ? (
            <CommandEmpty className="h-full max-h-[250px] px-2 py-1.5">
              <span className="text-gray-400 text-sm italic">
                {noResultText}
              </span>
            </CommandEmpty>
          ) : open && selectables.length > 0 ? (
            <div
              className={clsx(
                "scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 h-full max-h-[250px] overflow-auto",
                optionsClassName
              )}
            >
              <div className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs">
                {selectables.map((item) => (
                  <div
                    key={item.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => {
                      setQuery("");
                      forceSingleSelect
                        ? setSelected(() => {
                            onBlur?.([item]);
                            return [item];
                          })
                        : setSelected((prev) => {
                            onBlur?.([...prev, item]);
                            return [...prev, item];
                          });
                    }}
                    className="relative flex cursor-pointer select-none flex-col items-start rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <>
                      {item.name}
                      {formatOption ? formatOption(item) : item.description}
                      {extraNameSpecial ? (
                        <>
                          {typeof extraNameSpecial(item) === "string"
                            ? " - "
                            : null}
                          {extraNameSpecial(item)}
                        </>
                      ) : extraName ? (
                        <>
                          {" "}
                          -{" "}
                          <span className="font-semibold">
                            {extraName(item)}
                          </span>
                        </>
                      ) : null}
                    </>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Command>
  );
};
