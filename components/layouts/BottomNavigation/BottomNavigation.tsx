import { Box, HStack, Stack } from "@chakra-ui/react";

import Progress from "../../../components/elements/Progress/Progress";
import { useBackgroundColor } from "../../../hooks/ui";

export default function BottomNavigation() {
  const background = useBackgroundColor();

  return (
    <>
      <Box
        position="fixed"
        bottom="0"
        w="full"
        zIndex="popover"
        display={{ base: "initial", lg: "none" }}
      >
        <Box>
          <Stack spacing={0}>
            <Box
              h="16px"
              w="full"
              background={`linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, ${background} 100%)`}
            />

            <HStack justify={"center"} w="full" background={background}>
              <Box w="full" maxW={"320px"} p={"12px"}>
                <Progress length={3} currentStep={1} direction="row" />
              </Box>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
