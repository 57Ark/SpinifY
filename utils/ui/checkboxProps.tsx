import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const sizes = {
  sm: definePartsStyle({
    control: {
      boxSize: "14px",
    },
    icon: { fontSize: "8px" },
  }),
  md: definePartsStyle({
    control: {
      boxSize: "16px",
    },
    icon: { fontSize: "10px" },
  }),
  lg: definePartsStyle({
    control: {
      boxSize: "20px",
    },
    icon: { fontSize: "14px" },
  }),
};

export const checkboxControlProps = {
  bg: "#FAFAFA",
  borderColor: "#171717",

  _checked: {
    borderColor: "#6366F1",
    _disabled: {
      bg: "#FAFAFA",
      borderColor: "#6366F1",
    },
  },
  _indeterminate: {
    borderColor: "#6366F1",
    _disabled: {
      bg: "#FAFAFA",
      borderColor: "#6366F1",
    },
  },

  _disabled: {
    bg: "#FAFAFA",
    borderColor: "#171717",
  },

  _dark: {
    bg: "#171717",
    borderColor: "#FAFAFA",

    _checked: {
      borderColor: "#6366F1",
      _disabled: {
        bg: "#171717",
        borderColor: "#6366F1",
      },
    },
    _indeterminate: {
      borderColor: "#6366F1",
      _disabled: {
        bg: "#171717",
        borderColor: "#6366F1",
      },
    },

    _disabled: {
      bg: "#171717",
      borderColor: "#FAFAFA",
    },
  },
};

export const checkboxTheme = defineMultiStyleConfig({
  baseStyle: {},
  sizes,
  variants: {
    default: definePartsStyle({
      control: checkboxControlProps,
      icon: {
        color: "#6366F1",
        _disabled: { color: "#525252" },
      },
    }),
  },
  defaultProps: {
    variant: "default",
  },
});
