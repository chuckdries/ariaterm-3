/** @type { import('@storybook/react').Preview } */
import React from 'react';


import "../src/index.css";

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {},
    },
    darkMode: "class",
    themes: {
      default: "dark",
      list: [
        { name: "dark", class: "dark" },
        { name: "light", class: "light" },
      ],
    },
    viewport: {
      disable: true
    },
    colorTheme: {
      values: [
        { name: 'amber', value: 'amber' },
        { name: 'fuchsia', value: 'fuchsia' },
        { name: 'emerald', value: 'emerald' },
      ],
    },
  },

  globalTypes: {
    colorTheme: {
      name: "Color Theme",
      description: "Color theme for the site",
      defaultValue: "amber",
      toolbar: {
        icon: "paintbrush",
        // text: "Color Theme",
        items: ["amber", "fuchsia", "emerald"],
      },
    },
    darkModeTheme: {
      name: "Dark Mode Theme",
      description: "Dark mode theme for the site",
      defaultValue: "dark",
      toolbar: {
        icon: "circlehollow",
        // text: "Dark Mode Theme",
        items: ["dark", "light"],
      },
    }
  },

  decorators: [
    (Story, context) => {
      const darkModeTheme = context.globals.darkModeTheme;
      const colorTheme = context.globals.colorTheme;
      return (
        <div className={`w-full h-full ${darkModeTheme} ${colorTheme}`}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
