import React from 'react';
import {
  Switch as AriaSwitch,
  SwitchProps as AriaSwitchProps
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from './utils';

export interface SwitchProps extends Omit<AriaSwitchProps, 'children'> {
  children: React.ReactNode;
}

const track = tv({
  extend: focusRing,
  base: 'flex h-4 w-7 px-px items-center shrink-0 cursor-default rounded-full duration-200 ease-in-out shadow-inner border border-transparent',
  variants: {
    isSelected: {
      false: 'bg-primary-400 dark:bg-primary-400 group-pressed:bg-primary-500 dark:group-pressed:bg-primary-300',
      true: 'bg-primary-700 dark:bg-primary-300 forced-colors:!bg-[Highlight] group-pressed:bg-primary-800 dark:group-pressed:bg-primary-200',
    },
    isDisabled: {
      true: 'bg-primary-200 dark:bg-primary-700 forced-colors:group-selected:!bg-[primaryText] forced-colors:border-[primaryText]',
    }
  }
});

const handle = tv({
  base: 'h-3 w-3 transform rounded-full bg-white dark:bg-primary-900 outline outline-1 -outline-offset-1 outline-transparent shadow duration-200 ease-in-out',
  variants: {
    isSelected: {
      false: 'translate-x-0',
      true: 'translate-x-[100%]'
    },
    isDisabled: {
      true: 'forced-colors:outline-[primaryText]'
    }
  }
});

export function Switch({ children, ...props }: SwitchProps) {
  return (
    <AriaSwitch {...props} className={composeTailwindRenderProps(props.className, 'group flex gap-2 items-center text-primary-800 disabled:text-primary-300 dark:text-primary-200 dark:disabled:text-primary-600 forced-colors:disabled:text-[primaryText] text-sm')}>
      {(renderProps) => (
        <>
          <div className={track(renderProps)}>
            <span className={handle(renderProps)} />
          </div>
          {children}
        </>
      )}
    </AriaSwitch>
  );
}
