import { formErrorAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { cssVar, defineStyle } from "@chakra-ui/react";

import { noteProps } from "./textProps";

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(formErrorAnatomy.keys);

const $fg = cssVar("form-error-color");

export const formErrorMessageTheme = defineMultiStyleConfig({
	baseStyle: definePartsStyle({
		text: defineStyle({
			...noteProps,
			lineHeight: "10px",
			mx: "16px",
			[$fg.variable]: "#FF5B5B",
			color: "#FF5B5B",
		}),
	}),
});
