import React from 'react';
import { ToggleButton as RACToggleButton, ToggleButtonProps, composeRenderProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from './utils';

let styles = tv({
  extend: focusRing,
  base: 'px-5 py-2 text-sm text-center border border-black/10 dark:border-white/10 forced-colors:border-[ButtonBorder] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none cursor-default forced-color-adjust-none',
  variants: {
    isSelected: {
      false: 'bg-primary-100 hover:bg-primary-200 pressed:bg-primary-300 text-primary-800 dark:bg-primary-600 dark:hover:bg-primary-500 dark:pressed:bg-primary-400 dark:text-primary-100 forced-colors:!bg-[ButtonFace] forced-colors:!text-[ButtonText]',
      true: 'bg-primary-700 hover:bg-primary-800 pressed:bg-primary-900 text-white dark:bg-slate-300 dark:hover:bg-slate-200 dark:pressed:bg-slate-100 dark:text-black forced-colors:!bg-[Highlight] forced-colors:!text-[HighlightText]'
    },
    isDisabled: {
      true: 'bg-primary-100 dark:bg-primary-800 forced-colors:!bg-[ButtonFace] text-primary-300 dark:text-primary-600 forced-colors:!text-[primaryText] border-black/5 dark:border-white/5 forced-colors:border-[primaryText]'
    }
  }
});

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <RACToggleButton
      {...props}
      className={composeRenderProps(
        props.className,
        (className, renderProps) => styles({...renderProps, className})
      )} />
  );
}
