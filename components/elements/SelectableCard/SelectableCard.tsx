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

  // TODO: isDisabled

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
              filter: "drop-shadow(0 0 4px #6366F1)",
              msFilter: "drop-shadow(0 0 4px #6366F1)",
              WebkitFilter: "drop-shadow(0 0 4px #6366F1)",
              ..._hover,
            }
      }
      _active={
        isDisabled
          ? _active
          : {
              filter: "drop-shadow(0 0 2px #6366F1)",
              msFilter: "drop-shadow(0 0 2px #6366F1)",
              WebkitFilter: "drop-shadow(0 0 2px #6366F1)",
              ..._active,
            }
      }
      style={
        isSelected
          ? {
              filter: "drop-shadow(0 0 2px #6366F1)",
              msFilter: "drop-shadow(0 0 2px #6366F1)",
              WebkitFilter: "drop-shadow(0 0 2px #6366F1)",
              ...style,
            }
          : style
      }
      {...restProps}
    />
  );
}
