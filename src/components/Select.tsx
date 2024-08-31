import { ChevronDown } from 'lucide-react';
import React from 'react';
import {
  Select as AriaSelect,
  SelectProps as AriaSelectProps,
  Button,
  ListBox,
  ListBoxItemProps,
  SelectValue,
  ValidationResult
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Description, FieldError, Label } from './Field';
import { DropdownItem, DropdownSection, DropdownSectionProps } from './ListBox';
import { Popover } from './Popover';
import { composeTailwindRenderProps, focusRing } from './utils';

const styles = tv({
  extend: focusRing,
  base: 'flex items-center text-start gap-4 w-full cursor-default border border-black/10 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none pl-3 pr-2 py-2 min-w-[150px] bg-primary-50 dark:bg-primary-700',
  variants: {
    isDisabled: {
      false: 'text-primary-800 dark:text-primary-300 hover:bg-primary-100 pressed:bg-primary-200 dark:hover:bg-primary-600 dark:pressed:bg-primary-500 group-invalid:border-red-600 forced-colors:group-invalid:border-[Mark]',
      true: 'text-primary-200 dark:text-primary-600 forced-colors:text-[primaryText] dark:bg-primary-800 dark:border-white/5 forced-colors:border-[primaryText]'
    }
  }
});

export interface SelectProps<T extends object> extends Omit<AriaSelectProps<T>, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<T extends object>(
  { label, description, errorMessage, children, items, ...props }: SelectProps<T>
) {
  return (
    <AriaSelect {...props} className={composeTailwindRenderProps(props.className, 'group flex flex-col gap-1')}>
      {label && <Label>{label}</Label>}
      <Button className={styles}>
        <SelectValue className="flex-1 text-sm placeholder-shown:italic" />
        <ChevronDown aria-hidden className="w-4 h-4 text-primary-600 dark:text-primary-400 forced-colors:text-[ButtonText] group-disabled:text-primary-200 dark:group-disabled:text-primary-600 forced-colors:group-disabled:text-[primaryText]" />
      </Button>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="min-w-[--trigger-width]">
        <ListBox items={items} className="outline-none p-1 max-h-[inherit] overflow-auto [clip-path:inset(0_0_0_0_round_.75rem)]">
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}

export function SelectSection<T extends object>(props: DropdownSectionProps<T>) {
  return <DropdownSection {...props} />;
}
