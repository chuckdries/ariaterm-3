import React from 'react';
import { FieldErrorProps, Group, GroupProps, InputProps, LabelProps, FieldError as RACFieldError, Input as RACInput, Label as RACLabel, Text, TextProps, composeRenderProps } from "react-aria-components";
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from "./utils";

export function Label(props: LabelProps) {
  return <RACLabel {...props} className={twMerge('text-sm text-primary-500 dark:text-primary-400 font-medium cursor-default w-fit', props.className)} />;
}

export function Description(props: TextProps) {
  return <Text {...props} slot="description" className={twMerge('text-sm text-primary-600', props.className)} />;
}

export function FieldError(props: FieldErrorProps) {
  return <RACFieldError {...props} className={composeTailwindRenderProps(props.className, 'text-sm text-red-600 forced-colors:text-[Mark]')} />
}

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false: 'border-primary-300 dark:border-primary-500 forced-colors:border-[ButtonBorder]',
      true: 'border-primary-600 dark:border-primary-300 forced-colors:border-[Highlight]',
    },
    isInvalid: {
      true: 'border-red-600 dark:border-red-600 forced-colors:border-[Mark]'
    },
    isDisabled: {
      true: 'border-primary-200 dark:border-primary-700 forced-colors:border-[primaryText]'
    }
  }
});

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: 'group flex items-center h-9 bg-white dark:bg-primary-900 forced-colors:bg-[Field] border-2 overflow-hidden',
  variants: fieldBorderStyles.variants
});

export function FieldGroup(props: GroupProps) {
  return <Group {...props} className={composeRenderProps(props.className, (className, renderProps) => fieldGroupStyles({...renderProps, className}))} />;
}

export function Input(props: InputProps) {
  return <RACInput {...props} className={composeTailwindRenderProps(props.className, 'px-2 py-1.5 flex-1 min-w-0 outline outline-0 bg-white dark:bg-primary-900 text-sm text-primary-800 dark:text-primary-200 disabled:text-primary-200 dark:disabled:text-primary-600')} />
}
