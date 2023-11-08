import { Divider, Stack } from "@chakra-ui/react";
import { Fragment } from "react";

import { ProgressProps } from "./Progress.types";
import ProgressStep from "./ProgressStep";

export default function Progress({
	currentStep,
	length,
	direction = "row",
}: ProgressProps) {
	return (
		<Stack
			py={"4px"}
			spacing={direction === "row" ? ["8px", "12px", "16px"] : ["4px", "8px"]}
			justify="center"
			align={"center"}
			w="full"
			direction={direction}
		>
			{new Array(length).fill(0).map((_, index) => (
				<Fragment key={index}>
					<ProgressStep currentStep={currentStep} stepNumber={index} />
					{index < length - 1 && (
						<Stack
							spacing={0}
							w="full"
							direction={direction}
							align={"center"}
							justify={"center"}
						>
							{index === currentStep && (
								<Divider
									h={direction === "row" ? "2px" : "24px"}
									w={direction === "row" ? "50%" : "2px"}
									background={"#6366F1"}
									border="0"
									orientation={direction === "row" ? "horizontal" : "vertical"}
									opacity={0.8}
								/>
							)}
							<Divider
								h={
									direction === "row"
										? "2px"
										: index === currentStep
										? "24px"
										: "48px"
								}
								w={
									direction === "row"
										? index === currentStep
											? "50%"
											: "100%"
										: "2px"
								}
								background={index < currentStep ? "#D9F99D" : "#737373"}
								border="0"
								orientation={direction === "row" ? "horizontal" : "vertical"}
								opacity={index < currentStep ? 1 : 0.6}
							/>
						</Stack>
					)}
				</Fragment>
			))}
		</Stack>
	);
}
