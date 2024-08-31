import { Check } from 'lucide-react';
import React from 'react';
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxProps as AriaListBoxProps,
  Collection,
  Header,
  ListBoxItemProps,
  Section,
  SectionProps,
  composeRenderProps
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from './utils';

interface ListBoxProps<T> extends Omit<AriaListBoxProps<T>, 'layout' | 'orientation'> {}

export function ListBox<T extends object>(
  { children, ...props }: ListBoxProps<T>
) {
  return (
    <AriaListBox {...props} className={composeTailwindRenderProps(props.className, 'outline-0 p-1 border border-primary-300 dark:border-primary-600')}>
      {children}
    </AriaListBox>
  );
}

export const itemStyles = tv({
  extend: focusRing,
  base: 'group relative flex items-center gap-8 cursor-default select-none py-1.5 px-2.5 will-change-transform text-sm forced-color-adjust-none',
  variants: {
    isSelected: {
      false: 'text-slate-700 dark:text-primary-300 hover:bg-slate-200 dark:hover:bg-primary-700 -outline-offset-2',
      true: 'bg-accent-600 text-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] [&:has(+[data-selected])]: [&+[data-selected]]: -outline-offset-4 outline-white dark:outline-white forced-colors:outline-[HighlightText]'
    },
    isDisabled: {
      true: 'text-slate-300 dark:text-primary-600 forced-colors:text-[primaryText]'
    }
  }
});

export function ListBoxItem(props: ListBoxItemProps) {
  let textValue = props.textValue || (typeof props.children === 'string' ? props.children : undefined);
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={itemStyles}>
      {composeRenderProps(props.children, children => <>
        {children}
        <div className="absolute left-4 right-4 bottom-0 h-px bg-white/20 forced-colors:bg-[HighlightText] hidden [.group[data-selected]:has(+[data-selected])_&]:block" />
      </>)}
    </AriaListBoxItem>
  );
}

export const dropdownItemStyles = tv({
  base: 'group flex items-center gap-4 cursor-default select-none py-2 pl-3 pr-1 outline outline-0 text-sm forced-color-adjust-none',
  variants: {
    isDisabled: {
      false: 'text-primary-900 dark:text-primary-100',
      true: 'text-primary-300 dark:text-primary-600 forced-colors:text-[primaryText]'
    },
    isFocused: {
      true: 'bg-accent-600 text-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]'
    }
  },
  compoundVariants: [
    {
      isFocused: false,
      isOpen: true,
      className: 'bg-primary-100 dark:bg-primary-700/60'
    }
  ]
});

export function DropdownItem(props: ListBoxItemProps) {
  let textValue = props.textValue || (typeof props.children === 'string' ? props.children : undefined);
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={dropdownItemStyles}>
      {composeRenderProps(props.children, (children, {isSelected}) => <>
        <span className="flex items-center flex-1 gap-2 font-normal truncate group-selected:font-semibold">
          {children}
        </span>
        <span className="flex items-center w-5">
          {isSelected && <Check className="w-4 h-4" />}
        </span>
      </>)}
    </AriaListBoxItem>
  );
}

export interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string
}

export function DropdownSection<T extends object>(props: DropdownSectionProps<T>) {
  return (
    <Section className="first:-mt-[5px] after:content-[''] after:block after:h-[5px]">
      <Header className="text-sm font-semibold text-primary-500 dark:text-primary-300 px-4 py-1 truncate sticky -top-[5px] -mt-px -mx-1 z-10 bg-primary-100/60 dark:bg-primary-700/60 backdrop-blur-md supports-[-moz-appearance:none]:bg-primary-100 border-y dark:border-y-primary-700 [&+*]:mt-1">{props.title}</Header>
      <Collection items={props.items}>
        {props.children}
      </Collection>
    </Section>
  );
}
