import { Box, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";

import { ProgressStepProps } from "./Progress.types";

export default function ProgressStep({
	currentStep,
	stepNumber,
}: ProgressStepProps) {
	const { bgColor, borderColor, textColor } = useMemo(() => {
		return {
			bgColor: stepNumber < currentStep ? "#D9F99D" : "rgba(0, 0, 0, 0)",
			borderColor:
				stepNumber < currentStep
					? "#D9F99D"
					: stepNumber === currentStep
					? "#6366F1"
					: "#737373",
			textColor:
				stepNumber < currentStep
					? "#000000"
					: stepNumber === currentStep
					? "#6366F1"
					: "#737373",
		};
	}, [currentStep, stepNumber]);

	return (
		<Box
			w="24px"
			minW="24px"
			maxW="24px"
			h="24px"
			borderRadius="full"
			border="1px solid"
			background={bgColor}
			borderColor={borderColor}
		>
			<Stack w="full" h="full" justify="center" align="center">
				<Text
					fontFamily="mono"
					fontSize={"14px"}
					textColor={textColor}
					lineHeight={"12px"}
				>
					{stepNumber + 1}
				</Text>
			</Stack>
		</Box>
	);
}
