import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(inputAnatomy.keys);

export const inputFieldBaseProps = {
	border: "1px solid",
	borderRadius: "8px",

	h: ["40px", "40px", "44px"],

	background: "#FFFFFF",
	borderColor: "#A3A3A3",

	textColor: "#171717",

	_hover: {
		borderColor: "#737373",
		_disabled: {
			opacity: 1,
			borderColor: "#F5F5F5",
			background: "#F5F5F5",
			textColor: "#A3A3A3",
			fontWeight: "semibold",
		},
	},
	_focus: {
		zIndex: 1,
		borderColor: "#C7D2FE",
	},
	_invalid: {
		borderColor: "#FF5B5B",
	},

	_disabled: {
		opacity: 1,
		borderColor: "#F5F5F5",
		background: "#F5F5F5",
		textColor: "#A3A3A3",
		fontWeight: "semibold",
	},

	_dark: {
		background: "#262626",
		borderColor: "#525252",
		textColor: "#A3A3A3",

		_hover: {
			borderColor: "#737373",
			_disabled: {
				opacity: 1,
				borderColor: "#262626",
				background: "#262626",
				textColor: "#525252",
				fontWeight: "semibold",
			},
		},
		_focus: {
			zIndex: 1,
			borderColor: "#818CF8",
		},
		_invalid: {
			borderColor: "#FF5F5F",
		},

		_disabled: {
			opacity: 1,
			borderColor: "#262626",
			background: "#262626",
			textColor: "#525252",
			fontWeight: "semibold",
		},
	},
};

const inputElementBaseProps = {
	textColor: "#818181",
	fontWeight: "bold",
};

export const textProps = {
	fontSize: "16px",
	fontWeight: "normal",
};

export const textNumericProps = {
	fontFamily: "mono",
	fontWeight: "normal",
	fontSize: "16px",
};

const inputAddonBaseProps = {
	...inputElementBaseProps,
	border: "1px solid",
	borderRadius: "8px",

	h: ["40px", "40px", "44px"],

	background: "#FFFFFF",
	borderColor: "#A3A3A3",

	_dark: {
		background: "#262626",
		borderColor: "#525252",
	},
};

export const inputTheme = defineMultiStyleConfig({
	variants: {
		main: definePartsStyle({
			field: {
				...inputFieldBaseProps,
				...textProps,
			},
			element: {
				...inputElementBaseProps,
				...textProps,
			},
			addon: {
				...inputAddonBaseProps,
				...textProps,
			},
		}),
	},
	defaultProps: {
		variant: "main",
	},
});
