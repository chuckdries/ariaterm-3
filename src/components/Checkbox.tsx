import { Check, Minus } from 'lucide-react';
import React, { ReactNode } from 'react';
import { Checkbox as AriaCheckbox, CheckboxGroup as AriaCheckboxGroup, CheckboxGroupProps as AriaCheckboxGroupProps, CheckboxProps, ValidationResult, composeRenderProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Description, FieldError, Label } from './Field';
import { composeTailwindRenderProps, focusRing } from './utils';

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'children'> {
  label?: string,
  children?: ReactNode,
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup {...props} className={composeTailwindRenderProps(props.className, 'flex flex-col gap-2')}>
      <Label>{props.label}</Label>
      {props.children}
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaCheckboxGroup>
  );
}

const checkboxStyles = tv({
  base: 'flex gap-2 items-center group text-sm',
  variants: {
    isDisabled: {
      false: 'text-primary-800 dark:text-primary-200',
      true: 'text-primary-300 dark:text-primary-600 forced-colors:text-[primaryText]'
    }
  }
});

const boxStyles = tv({
  extend: focusRing,
  base: 'w-5 h-5 flex-shrink-0 rounded flex items-center justify-center border-2',
  variants: {
    isSelected: {
      false: 'dark:bg-primary-900 border-[--color] [--color:theme(colors.primary.400)] dark:[--color:colors.primary-400)] group-pressed:[--color:theme(colors.primary.500)] dark:group-pressed:[--color:theme(colors.primary.300)]',
      true: 'bg-[--color] border-[--color] [--color:theme(colors.primary.700)] group-pressed:[--color:theme(colors.primary.800)] dark:[--color:theme(colors.accent.500)] dark:group-pressed:[--color:theme(colors.accent.200)] forced-colors:![--color:Highlight]'
    },
    isInvalid: {
      true: '[--color:theme(colors.red.700)] dark:[--color:theme(colors.red.600)] forced-colors:![--color:Mark] group-pressed:[--color:theme(colors.red.800)] dark:group-pressed:[--color:theme(colors.red.700)]'
    },
    isDisabled: {
      true: '[--color:theme(colors.primary.200)] dark:[--color:theme(colors.primary.700)] forced-colors:![--color:primaryText]'
    }
  }
});

const iconStyles = 'w-4 h-4 text-accent-500 group-disabled:text-gray-400 dark:text-accent-900 dark:group-disabled:text-accent-600 forced-colors:text-[HighlightText]';

export function Checkbox(props: CheckboxProps) {
  return (
    <AriaCheckbox {...props} className={composeRenderProps(props.className, (className, renderProps) => checkboxStyles({...renderProps, className}))}>
      {({isSelected, isIndeterminate, ...renderProps}) => (
        <>
          <div className={boxStyles({isSelected: isSelected || isIndeterminate, ...renderProps})}>
            {isIndeterminate
              ? <Minus aria-hidden className={iconStyles} />
              : isSelected
                ? <Check aria-hidden className={iconStyles} />
                : null
            }
          </div>
          {props.children}
        </>
      )}
    </AriaCheckbox>
  );
}
