import React from 'react';
import {
  Slider as AriaSlider,
  SliderProps as AriaSliderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Label } from './Field';
import { composeTailwindRenderProps, focusRing } from './utils';

const trackStyles = tv({
  base: 'rounded-full',
  variants: {
    orientation: {
      horizontal: 'w-full h-[6px]',
      vertical: 'h-full w-[6px] ml-[50%] -translate-x-[50%]'
    },
    isDisabled: {
      false: 'bg-primary-300 dark:bg-primary-500 forced-colors:bg-[ButtonBorder]',
      true: 'bg-primary-100 dark:bg-primary-800 forced-colors:bg-[primaryText]'
    }
  }
});

const thumbStyles = tv({
  extend: focusRing,
  base: 'w-6 h-6 group-orientation-horizontal:mt-6 group-orientation-vertical:ml-3 rounded-full bg-primary-50 dark:bg-primary-900 border-2 border-primary-700 dark:border-primary-300',
  variants: {
    isDragging: {
      true: 'bg-primary-700 dark:bg-primary-300 forced-colors:bg-[ButtonBorder]'
    },
    isDisabled: {
      true: 'border-primary-300 dark:border-primary-700 forced-colors:border-[primaryText]'
    }
  }
});

export interface SliderProps<T> extends AriaSliderProps<T> {
  label?: string;
  thumbLabels?: string[];
}

export function Slider<T extends number | number[]>(
  { label, thumbLabels, ...props }: SliderProps<T>
) {
  return (
    <AriaSlider {...props} className={composeTailwindRenderProps(props.className, 'orientation-horizontal:grid orientation-vertical:flex grid-cols-[1fr_auto] flex-col items-center gap-2 orientation-horizontal:w-64')}>
      <Label>{label}</Label>
      <SliderOutput className="text-sm text-primary-500 dark:text-primary-400 font-medium orientation-vertical:hidden">
        {({ state }) => state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')}
      </SliderOutput>
      <SliderTrack className="group col-span-2 orientation-horizontal:h-6 orientation-vertical:w-6 orientation-vertical:h-64 flex items-center">
        {({ state, ...renderProps }) => <>
          <div className={trackStyles(renderProps)} />
          {state.values.map((_, i) => <SliderThumb key={i} index={i} aria-label={thumbLabels?.[i]} className={thumbStyles} />)}
        </>}
      </SliderTrack>
    </AriaSlider>
  );
}
