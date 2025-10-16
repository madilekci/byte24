'use client';

import { ChevronDown, X } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@byte24/ui/components/badge';
import { Command, CommandEmpty, CommandList } from '@byte24/ui/components/command';
import { useDebounce } from '@byte24/ui/hooks';
import { Command as CommandPrimitive } from 'cmdk';

import { Icons } from '@byte24/ui/components/icons';
import { IOption } from '@byte24/ui/interfaces';
import { UseQueryResult } from '@tanstack/react-query';
import clsx from 'clsx';
import { INestedOption } from '../../../../apps/dashboard/types/index';

import { Checkbox, cn } from '@byte24/ui';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@byte24/ui/components/collapsible';

type List = IOption[]; //Record<'id' | 'name', string>;

interface NestedSearchMultiSelectAsyncProps {
  //list: List[];
  selected?: INestedOption[];
  setSelected?: React.Dispatch<React.SetStateAction<INestedOption[]>>;
  label?: string;
  searchText?: string;
  noResultText?: string;
  useFetch: (debounceValue?: string) => UseQueryResult<INestedOption[]>;
  defaultSelectedIds?: number[];
  forceSingleSelect?: boolean;
  dependencyArray?: any[];
  formatOption?: (option: INestedOption) => string;
  extraName?: (option: INestedOption) => string;
  extraNameSpecial?: (option: INestedOption) => JSX.Element | string;
  preRequisites?: (() => boolean)[];
  preRequisiteText?: string;
  includeExtraNameInSelected?: boolean;
  onBlur?: (values: INestedOption[]) => void;
  className?: string;
  selectClassName?: string;
  optionsClassName?: string;
  inner?: boolean;
}

export const NestedSearchMultiSelectAsync = ({
  //list,
  selected: outsideSelected,
  setSelected: outsideSetSelected,
  onBlur,
  label,
  noResultText = 'Geen resultaten...',
  searchText = 'Zoek bedrijven...',
  formatOption,
  extraName,
  extraNameSpecial,
  useFetch,
  defaultSelectedIds,
  forceSingleSelect = false,
  includeExtraNameInSelected = false,
  preRequisites = [],
  preRequisiteText = 'Voorwaarden niet voldaan...',
  dependencyArray = [],
  className,
  selectClassName,
  optionsClassName,
  inner,
}: NestedSearchMultiSelectAsyncProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  const [innerSelected, setInnerSelected] = React.useState<INestedOption[]>(outsideSelected ?? []);

  const setSelected = inner ? setInnerSelected : outsideSetSelected || setInnerSelected;
  const selected = inner ? innerSelected : outsideSelected;

  const [query, setQuery] = React.useState('');
  const debounceValue = useDebounce(query, 500);

  const { data: options, refetch, isPending } = useFetch(debounceValue);

  const findSelected = (selectedIds: number[], options: INestedOption[]) => {
    let selected: INestedOption[] = [];

    options?.forEach((option) => {
      if (selectedIds.includes(option.id) && !option.notSelectable) {
        selected.push(option);
      }

      if (option?.options?.length) {
        selected = [...selected, ...findSelected(selectedIds, option.options)];
      }
    });

    return selected;
  };

  React.useEffect(() => {
    if (defaultSelectedIds && defaultSelectedIds?.length > 0) {
      const defaultSelected = findSelected(defaultSelectedIds, options ?? []);

      if (defaultSelected) setSelected(defaultSelected);
    }
  }, [options, defaultSelectedIds]);

  const handleUnselect = React.useCallback((item: IOption) => {
    setSelected((prev) => {
      const newSelected = prev.filter((s) => s.id !== item.id);
      onBlur?.(newSelected);
      return newSelected;
    });
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    try {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.id === '') {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              onBlur?.(newSelected);

              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  const selectedIds = React.useMemo(() => selected?.map((item) => item.id) ?? [], [selected]);

  const onClick = React.useCallback((selected: boolean, item: INestedOption | INestedOption[]) => {
    setSelected((prev) => {
      // onBlur?.([...prev, item]);
      if (selected) {
        const ids = (Array.isArray(item) ? item : [item]).map((i) => i.id);
        return prev.filter((i) => !ids.includes(i.id));
      }
      return [...prev, ...(Array.isArray(item) ? item : [item])];
    });
  }, []);

  const isSelected = React.useCallback(
    (id: number) => {
      return selectedIds.includes(id);
    },
    [selectedIds]
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={clsx('overflow-visible bg-transparent', className)}
    >
      {label && <label className='block pb-2 font-medium text-gray-700 text-sm'>{label}</label>}
      {/* <CommandInput placeholder='Type a command or search...' /> */}
      <div className='group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
        <div
          className={clsx(
            'scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 flex flex-wrap gap-1 overflow-y-auto',
            selectClassName
          )}
        >
          {selected?.map((item) => {
            return (
              <Badge key={item.id} variant='secondary'>
                <div>
                  {item.name}
                  {formatOption ? formatOption(item) : item.description}
                  {includeExtraNameInSelected && extraNameSpecial ? (
                    <> {extraNameSpecial(item)}</>
                  ) : extraName ? (
                    <>
                      {' '}
                      - <span className='font-semibold'>{extraName(item)}</span>
                    </>
                  ) : null}
                </div>
                <button
                  className='ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                </button>
              </Badge>
            );
          })}
        </div>
        {/* Avoid having the "Search" Icon */}
        <CommandPrimitive.Input
          ref={inputRef}
          id={query}
          onValueChange={setQuery}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          placeholder={searchText ?? ''}
          className='active: ml-2 flex-1 bg-transparent outline-none ring-0 placeholder:text-muted-foreground active:outline-none'
        />
      </div>
      <CommandList></CommandList>
      <div
        className={clsx('relative', {
          'mt-2': open && options?.length,
        })}
      >
        <div
          className={clsx(
            {
              'border-transparent': !(open && options?.length),
            },
            'absolute top-0 z-10 w-full animate-in rounded-md border bg-popover text-popover-foreground shadow-md outline-none'
          )}
        >
          {isPending ? (
            <Icons.spinner className='mx-auto my-2 h-6 w-6 fill-primary' />
          ) : open && options?.length === 0 ? (
            <CommandEmpty className='h-full max-h-[250px] px-2 py-1.5'>
              <span className='text-gray-400 text-sm italic'>{noResultText}</span>
            </CommandEmpty>
          ) : open && options?.length !== 0 ? (
            <div
              className={clsx(
                'scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 h-full max-h-[250px] overflow-auto',
                optionsClassName
              )}
            >
              <div className='overflow-hidden p-2 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs'>
                {options?.map((item) => (
                  // <div
                  //   key={item.id}
                  //   onMouseDown={(e) => {
                  //     e.preventDefault();
                  //     e.stopPropagation();
                  //   }}
                  //   onClick={() => {
                  //     setQuery('');
                  //     forceSingleSelect
                  //       ? setSelected(() => {
                  //           onBlur?.([item]);
                  //           return [item];
                  //         })
                  //       : setSelected((prev) => {
                  //           onBlur?.([...prev, item]);
                  //           return [...prev, item];
                  //         });
                  //   }}
                  //   className='relative flex cursor-pointer select-none flex-col items-start rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                  // >
                  //   {item.name}
                  // </div>
                  <SelectableItem
                    key={item.id}
                    item={item}
                    onClick={onClick}
                    isSelected={isSelected}
                    level={0}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Command>
  );
};

interface SelectableItemProps {
  item: INestedOption;
  onClick: (selected: boolean, item: INestedOption | INestedOption[]) => void;
  isSelected: (id: number) => boolean;
  level: number;
}

const flatOptionsMap = (options: INestedOption[]): INestedOption[] => {
  if (!options || options.length === 0) return [];
  return [
    ...options,
    ...options.flatMap((option) => (option?.options ? flatOptionsMap(option?.options) : [])),
  ];
};

const SelectableItem = React.memo(({ item, onClick, isSelected, level }: SelectableItemProps) => {
  const selected = isSelected(item.id);

  const row = (
    <div className='flex items-center gap-x-4'>
      <div className='w-2'>
        {!item?.notSelectable && (
          <Checkbox
            checked={selected}
            onCheckedChange={() => onClick(selected, flatOptionsMap([item]))}
            disabled={item?.notSelectable}
          />
        )}
      </div>
      <p
        style={{
          marginLeft: `${level * 20}px`,
        }}
      >
        {item?.name}
      </p>
    </div>
  );

  return item?.options && item?.options?.length > 0 ? (
    <Collapsible
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={cn('w-full rounded', {})}
    >
      <div className='flex w-full items-center justify-between rounded p-2 text-start hover:bg-muted'>
        {row}
        <CollapsibleTrigger>
          <ChevronDown className='h-4 w-4' />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent
        className={cn('z-50 w-full rounded', {
          'bg-accent/20': true,
        })}
      >
        {item?.options?.map((option) => (
          <SelectableItem
            key={option.id}
            item={option}
            onClick={onClick}
            isSelected={isSelected}
            level={level + 1}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <div className='flex w-full items-center justify-between rounded p-2 text-start hover:bg-muted'>
      {row}
    </div>
  );
});
