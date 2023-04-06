import { Box, HStack, Stack } from "@chakra-ui/react";
import { useAtom } from "jotai";

import Progress from "@/components/elements/Progress/Progress";
import { useBackgroundColor } from "@/hooks/ui";
import { stepAtom } from "@/utils/store";

export default function BottomNavigation() {
  const [currentStep] = useAtom(stepAtom);

  const background = useBackgroundColor();

  return (
    <>
      <Box
        position="fixed"
        bottom="0"
        w="full"
        zIndex="popover"
        display={{ base: currentStep >= 0 ? "initial" : "none", lg: "none" }}
      >
        <Box>
          {currentStep >= 0 && (
            <Stack spacing={0}>
              <Box
                h="16px"
                w="full"
                background={`linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, ${background} 100%)`}
              />

              <HStack justify={"center"} w="full" background={background}>
                <Box w="full" maxW={"320px"} p={"12px"}>
                  <Progress
                    length={3}
                    currentStep={currentStep}
                    direction="row"
                  />
                </Box>
              </HStack>
            </Stack>
          )}
        </Box>
      </Box>
    </>
  );
}
