import React from 'react';
import {
  RangeCalendar as AriaRangeCalendar,
  RangeCalendarProps as AriaRangeCalendarProps,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  DateValue,
  Text
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { CalendarGridHeader, CalendarHeader } from './Calendar';
import { focusRing } from './utils';

export interface RangeCalendarProps<T extends DateValue> extends Omit<AriaRangeCalendarProps<T>, 'visibleDuration'> {
  errorMessage?: string;
}

const cell = tv({
  extend: focusRing,
  base: 'w-full h-full flex items-center justify-center rounded-full forced-color-adjust-none text-primary-900 dark:text-primary-200',
  variants: {
    selectionState: {
      'none': 'group-hover:bg-primary-100 dark:group-hover:bg-primary-700 group-pressed:bg-primary-200 dark:group-pressed:bg-primary-600',
      'middle': [
        'group-hover:bg-accent-200 dark:group-hover:bg-accent-900 forced-colors:group-hover:bg-[Highlight]',
        'group-invalid:group-hover:bg-red-200 dark:group-invalid:group-hover:bg-red-900 forced-colors:group-invalid:group-hover:bg-[Mark]',
        'group-pressed:bg-accent-300 dark:group-pressed:bg-accent-800 forced-colors:group-pressed:bg-[Highlight] forced-colors:text-[HighlightText]',
        'group-invalid:group-pressed:bg-red-300 dark:group-invalid:group-pressed:bg-red-800 forced-colors:group-invalid:group-pressed:bg-[Mark]',
      ],
      'cap': 'bg-accent-600 group-invalid:bg-red-600 forced-colors:bg-[Highlight] forced-colors:group-invalid:bg-[Mark] text-white forced-colors:text-[HighlightText]'
    },
    isDisabled: {
      true: 'text-primary-300 dark:text-primary-600 forced-colors:text-[primaryText]'
    }
  }
});

export function RangeCalendar<T extends DateValue>(
  { errorMessage, ...props }: RangeCalendarProps<T>
) {
  return (
    <AriaRangeCalendar {...props}>
      <CalendarHeader />
      <CalendarGrid className="[&_td]:px-0">
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => <CalendarCell date={date} className="group w-9 h-9 text-sm outline outline-0 cursor-default outside-month:text-primary-300 selected:bg-accent-100 dark:selected:bg-accent-700/30 forced-colors:selected:bg-[Highlight] invalid:selected:bg-red-100 dark:invalid:selected:bg-red-700/30 forced-colors:invalid:selected:bg-[Mark] [td:first-child_&]:full selection-start:full [td:last-child_&]:full selection-end:full">
            {({formattedDate, isSelected, isSelectionStart, isSelectionEnd, isFocusVisible, isDisabled}) =>
              <span
                className={cell({
                  selectionState: isSelected && (isSelectionStart || isSelectionEnd) ? 'cap' : isSelected ? 'middle' : 'none',
                  isDisabled,
                  isFocusVisible
                })}>
                {formattedDate}
              </span>
            }
          </CalendarCell>}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && <Text slot="errorMessage" className="text-sm text-red-600">{errorMessage}</Text>}
    </AriaRangeCalendar>
  );
}
