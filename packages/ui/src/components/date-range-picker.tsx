'use client';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { Button } from '@byte24/ui/components/button';
import { Calendar } from '@byte24/ui/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@byte24/ui/components/popover';
import { cn } from '@byte24/ui/utils';
import { clsx } from 'clsx';

interface DatePickerPickerWithRangeProps {
  width?: string;
  className?: string;
  contentClassName?: string;
  date?: DateRange;
  onValueChange: (prev: any) => void;
  showOnlyWeekends?: boolean;
  modal?: boolean;
}

export function DatePickerWithRange({
  width = 'w-[300px]',
  className,
  contentClassName,
  date,
  onValueChange,
  showOnlyWeekends = false,
  modal = false,
}: DatePickerPickerWithRangeProps) {
  const handleDayClick = (day: Date) => {
    onValueChange((prev: DateRange) => {
      if (prev?.to) {
        // If 'to' is already set, reset the range
        return { from: day, to: undefined };
      } else if (prev?.from) {
        // If 'from' is set and 'to' is not
        if (day < prev.from) {
          // If the new day is before the 'from' date, reset the range
          return { from: day, to: undefined };
        } else {
          // Otherwise, set the 'to' date
          return { from: prev.from, to: day };
        }
      } else {
        // If neither 'from' nor 'to' is set, set 'from'
        return { from: day, to: undefined };
      }
    });
  };

  return (
    <div className={clsx('grid gap-2', className)}>
      <Popover modal={modal}>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={clsx(
              'justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              width
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Selecteer een datum</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-auto p-0', contentClassName)} align='start'>
          <Calendar
            initialFocus
            mode='range'
            className='w-full'
            defaultMonth={date?.from}
            selected={date}
            onSelect={(e) => {
              onValueChange(e!);
            }}
            numberOfMonths={2}
            onDayClick={handleDayClick}
            showOnlyWeekends={showOnlyWeekends}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
