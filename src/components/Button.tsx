import React from 'react';
import { composeRenderProps, Button as RACButton, ButtonProps as RACButtonProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from './utils';

export interface ButtonProps extends RACButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'icon'
}

let button = tv({
  extend: focusRing,
  base: 'px-5 py-2 text-sm text-center border border-black/10 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none cursor-default',
  variants: {
    variant: {
      primary: 'bg-accent-600 hover:bg-accent-700 pressed:bg-accent-800 text-white',
      secondary: 'bg-primary-100 hover:bg-primary-200 pressed:bg-primary-300 text-primary-800 dark:bg-primary-600 dark:hover:bg-primary-500 dark:pressed:bg-primary-400 dark:text-primary-100',
      destructive: 'bg-red-700 hover:bg-red-800 pressed:bg-red-900 text-white',
      icon: 'border-0 p-1 flex items-center justify-center text-primary-600 hover:bg-black/[5%] pressed:bg-black/10 dark:text-primary-400 dark:hover:bg-white/10 dark:pressed:bg-white/20 disabled:bg-transparent'
    },
    isDisabled: {
      true: 'bg-primary-100 dark:bg-primary-800 text-primary-300 dark:text-primary-600 forced-colors:text-[primaryText] border-black/5 dark:border-white/5'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(
        props.className,
        (className, renderProps) => button({...renderProps, variant: props.variant, className})
      )} />
  );
}
