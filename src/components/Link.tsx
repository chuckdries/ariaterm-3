import React from 'react';
import { Link as AriaLink, LinkProps as AriaLinkProps, composeRenderProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from './utils';

interface LinkProps extends AriaLinkProps {
  variant?: 'primary' | 'secondary'
}

const styles = tv({
  extend: focusRing,
  base: 'underline disabled:no-underline disabled:cursor-default forced-colors:disabled:text-[primaryText] rounded',
  variants: {
    variant: {
      primary: 'text-accent-600 dark:text-accent-500 underline decoration-accent-600/60 hover:decoration-accent-600 dark:decoration-accent-500/60 dark:hover:decoration-accent-500',
      secondary: 'text-primary-700 dark:text-primary-300 underline decoration-primary-700/50 hover:decoration-primary-700 dark:decoration-primary-300/70 dark:hover:decoration-primary-300'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});

export function Link(props: LinkProps) {
  return <AriaLink {...props} className={composeRenderProps(props.className, (className, renderProps) =>  styles({...renderProps, className, variant: props.variant}))} />;
}
