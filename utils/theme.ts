import {
  extendTheme,
  StyleConfig,
  StyleFunctionProps,
  ThemeConfig,
} from "@chakra-ui/react";

import { buttonTheme } from "./ui/buttonProps";
import { formErrorMessageTheme } from "./ui/formErrorMessageProps";
import { inputTheme } from "./ui/inputProps";
import {
  defaultTextProps,
  noteProps,
  pageHeadingProps,
  subtitleProps,
  titleProps,
} from "./ui/textProps";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

export const colors = {
  gray: {
    "50": "#FAFAFA",
    "100": "#F5F5F5",
    "200": "#E5E5E5",
    "300": "#D4D4D4",
    "400": "#A3A3A3",
    "500": "#737373",
    "600": "#525252",
    "700": "#404040",
    "800": "#262626",
    "900": "#171717",
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: "Sora, -apple-system, system-ui, sans-serif",
    body: "Albert Sans, -apple-system, system-ui, sans-serif",
    mono: "Prompt, -apple-system, system-ui, sans-serif",
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
      },
    }),
  },
  components: {
    FormError: formErrorMessageTheme,
    Input: inputTheme,
    Button: buttonTheme,
    Text: {
      defaultProps: {
        variant: "default",
      },
      variants: {
        default: defaultTextProps,
        head: pageHeadingProps,
        title: titleProps,
        subtitle: subtitleProps,
        note: noteProps,
      },
    },
  } as Record<string, StyleConfig>,
});

export { theme };
