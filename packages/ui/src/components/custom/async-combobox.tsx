'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { clsx } from 'clsx';
import { Button } from '@byte24/ui/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@byte24/ui/components/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@byte24/ui/components/popover';
import { useDebounce } from '@byte24/ui/hooks';

import { IOption } from '@byte24/ui/interfaces';
import { Icons } from '@byte24/ui/components/icons';

interface IAsyncComboboxProps {
  onSearch: (search: string) => Promise<IOption[] | undefined>;
  selectText?: string;
  searchText?: string;
  emptyText?: string;
  value?: string;
  onChange: (value: number | null) => void;
  width?: string;
  activeOption?: IOption;
  resetTrigger?: boolean;
  disabled?: boolean;
  //loading?: boolean;
}

export function AsyncCombobox({
  onSearch,
  selectText = 'Select framework...',
  searchText = 'Search framework...',
  emptyText = 'No framework found.',
  value,
  onChange,
  width = 'w-[200px]',
  activeOption,
  resetTrigger,
  disabled = false,
  //loading,extraQuery
}: IAsyncComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [options, setOptions] = React.useState<IOption[]>([]);

  const [query, setQuery] = React.useState('');
  const debounceValue = useDebounce(query, 500);

  React.useEffect(() => {
    onSearch(query).then((data) => {
      setOptions(data ?? []);
      setLoaded(true);
      setQuery('');
    });
  }, [resetTrigger]);

  React.useEffect(() => {
    if (loaded) {
      setLoading(true);
      onSearch(debounceValue)
        .then((data) => {
          setOptions(data!);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [debounceValue]);

  const isLoading = !options;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={clsx('justify-between font-normal', width)}
        >
          {value ? activeOption?.name : selectText}{' '}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width]'>
        {/* className={clsx('p-0', 'w-[200px]')}*/}
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchText}
            value={query}
            onValueChange={(newValue: string) => {
              setLoading(true);
              setQuery(newValue);
            }}
          />
          {!loading && <CommandEmpty>{emptyText}</CommandEmpty>}
          <CommandList>
            <CommandGroup className='max-h-[400px] overflow-y-auto'>
              {loading ? (
                <Icons.spinner className='fill-louter mx-auto mt-4 h-6 w-6' />
              ) : (
                options?.map((item) => {
                  return (
                    <CommandItem
                      key={item.id}
                      value={item?.id?.toString()}
                      onSelect={(currentValue) => {
                        setQuery('');
                        onChange(
                          currentValue === value ? null : Number(currentValue)
                        );
                        setOpen(false);
                      }}
                      className='cursor-pointer'
                    >
                      <Check
                        className={clsx(
                          'mr-2 h-4 w-4 text-primary',
                          value === item.id?.toString()
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {item.name}
                      {item?.description && (
                        <span className='ml-1 text-xs text-gray-500'>
                          {item.description}
                        </span>
                      )}
                    </CommandItem>
                  );
                })
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
