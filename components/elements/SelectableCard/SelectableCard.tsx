import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";

export interface SelectableCardProps extends BoxProps {
	isSelected: boolean;
	isDisabled?: boolean;
}

export default function SelectableCard({
	isSelected,
	isDisabled = false,
	style,
	_hover,
	_active,
	...restProps
}: SelectableCardProps) {
	const background = useColorModeValue("#F5F5F5", "#262626");
	const borderColor = useColorModeValue("#737373", "#262626");

	return (
		<Box
			borderRadius="10px"
			py={"12px"}
			px={"8px"}
			m="6px"
			border={"1px"}
			borderColor={isSelected ? "#6366F1" : borderColor}
			background={background}
			cursor={isDisabled ? "not-allowed" : "pointer"}
			_hover={
				isDisabled
					? _hover
					: {
							boxShadow: isSelected ? undefined : "0 0 6px #6366F1",
							..._hover,
					  }
			}
			_active={
				isDisabled
					? _active
					: {
							boxShadow: "0 0 4px #6366F1",
							..._active,
					  }
			}
			style={
				isSelected
					? {
							boxShadow: "0 0 4px #6366F1",
							...style,
					  }
					: style
			}
			{...restProps}
		/>
	);
}
