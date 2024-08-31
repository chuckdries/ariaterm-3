import type { Meta } from '@storybook/react';
import React from 'react';
import { Form } from 'react-aria-components';
import { Button } from '~/components/Button';
import { TextField } from '~/components/TextField';

const meta: Meta<typeof TextField> = {
  component: TextField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    label: 'Name'
  }
};

export default meta;

export const Example = (args: any) => <TextField {...args} />;

export const Validation = (args: any) => (
  <Form className="flex flex-col gap-2 items-start">
    <TextField {...args} />
    <Button type="submit" variant="secondary">Submit</Button>
  </Form>
);

Validation.args = {
  isRequired: true
};
