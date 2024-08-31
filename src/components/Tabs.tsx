import React from 'react';
import {
  Tab as RACTab,
  TabList as RACTabList,
  TabPanel as RACTabPanel,
  Tabs as RACTabs,
  TabListProps,
  TabPanelProps,
  TabProps,
  TabsProps,
  composeRenderProps
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from './utils';

const tabsStyles = tv({
  base: 'flex gap-4',
  variants: {
    orientation: {
      horizontal: 'flex-col',
      vertical: 'flex-row w-[800px]'
    }
  }
});

export function Tabs(props: TabsProps) {
  return (
    <RACTabs
      {...props}
      className={composeRenderProps(
        props.className,
        (className, renderProps) => tabsStyles({...renderProps, className})
      )} />
  );
}

const tabListStyles = tv({
  base: 'flex gap-1',
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col items-start'
    }
  }
});

export function TabList<T extends object>(props: TabListProps<T>) {
  return (
    <RACTabList
      {...props}
      className={composeRenderProps(
        props.className,
        (className, renderProps) => tabListStyles({...renderProps, className})
      )} />
  );
}

const tabProps = tv({
  extend: focusRing,
  base: 'flex items-center cursor-default rounded-full px-4 py-1.5 text-sm font-medium forced-color-adjust-none',
  variants: {
    isSelected: {
      false: 'text-primary-600 dark:text-primary-300 hover:text-primary-700 pressed:text-primary-700 dark:hover:text-primary-200 dark:pressed:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-800 pressed:bg-primary-200 dark:pressed:bg-primary-800',
      true: 'text-white dark:text-black forced-colors:text-[HighlightText] bg-primary-800 dark:bg-primary-200 forced-colors:bg-[Highlight]'
    },
    isDisabled: {
      true: 'text-primary-200 dark:text-primary-600 forced-colors:text-[primaryText] selected:text-primary-300 dark:selected:text-primary-500 forced-colors:selected:text-[HighlightText] selected:bg-primary-200 dark:selected:bg-primary-600 forced-colors:selected:bg-[primaryText]'
    }
  }
});

export function Tab(props: TabProps) {
  return (
    <RACTab
      {...props}
      className={composeRenderProps(
        props.className,
        (className, renderProps) => tabProps({...renderProps, className})
      )} />
  );
}

const tabPanelStyles = tv({
  extend: focusRing,
  base: 'flex-1 p-4 text-sm text-primary-900 dark:text-primary-100'
});

export function TabPanel(props: TabPanelProps) {
  return (
    <RACTabPanel
      {...props}
      className={composeRenderProps(
        props.className,
        (className, renderProps) => tabPanelStyles({...renderProps, className})
      )} />
  );
}
