const buttonTextProps = {
  fontWeight: "semibold",
};

const smallButtonSize = {
  px: "12px",
  h: ["32px", "32px", "36px"],
  borderRadius: "12px",
  fontSize: ["12px", "12px", "14px"],
};

const mediumButtonSize = {
  px: "16px",
  h: ["40px", "40px", "44px"],
  borderRadius: "12px",
  fontSize: ["14px", "14px", "16px"],
};

const largeButtonSize = {
  px: "16px",
  h: ["52px", "52px", "56px"],
  borderRadius: "12px",
  fontSize: ["14px", "14px", "16px"],
};

const mainButonProps = {
  ...buttonTextProps,

  background: "#4F46E5",
  textColor: "#FFF",

  _active: {
    background: "#4338CA",
  },

  _hover: {
    background: "#4338CA",
    _disabled: {
      background: "#818CF8",
      cursor: "not-allowed",
    },
  },

  _disabled: {
    background: "#818CF8",
    cursor: "not-allowed",
  },
};

const additionalButonProps = {
  ...buttonTextProps,

  background: "#F5F5F5",
  textColor: "#171717",

  _active: {
    background: "#E5E5E5",
  },

  _hover: {
    background: "#E5E5E5",
    _disabled: {
      textColor: "#A3A3A3",
      background: "#F5F5F5",
      cursor: "not-allowed",
    },
  },

  _disabled: {
    textColor: "#A3A3A3",
    background: "#F5F5F5",
    cursor: "not-allowed",
  },

  _dark: {
    background: "#262626",
    textColor: "#FAFAFA",

    _active: {
      background: "#404040",
    },

    _hover: {
      background: "#404040",
      _disabled: {
        textColor: "#525252",
        background: "#262626",
        cursor: "not-allowed",
      },
    },

    _disabled: {
      textColor: "#525252",
      background: "#262626",
      cursor: "not-allowed",
    },
  },
};

export const buttonTheme = {
  sizes: {
    sm: smallButtonSize,
    md: mediumButtonSize,
    lg: largeButtonSize,
  },
  variants: {
    main: mainButonProps,
    additional: additionalButonProps,
  },
};
