import { Box, Stack } from "@chakra-ui/react";
import { useAtom } from "jotai";

import AnimationPresenceDisplay from "@/components/elements/AnimationPresenceDisplay/AnimationPresenceDisplay";
import Progress from "@/components/elements/Progress/Progress";
import Header from "@/components/modules/Header/Header";
import Scraping from "@/components/modules/Scraping/Scraping";
import { stepAtom } from "@/store";

export default function Home() {
  const [currentStep] = useAtom(stepAtom);

  // добавить пометку, что плейлисты должны быть открыты
  return (
    <Stack spacing={0}>
      <Header />

      <Box
        display={{ base: "none", lg: "initial" }}
        position={"relative"}
        h="0"
        left="-48px"
        w="fit-content"
      >
        <AnimationPresenceDisplay presence={currentStep >= 0}>
          <Box py={"48px"}>
            <Progress length={3} currentStep={currentStep} direction="column" />
          </Box>
        </AnimationPresenceDisplay>
      </Box>

      <Stack
        spacing={{ base: "32px", md: "48px" }}
        py={{ base: "32px", md: "48px" }}
      >
        <AnimationPresenceDisplay presence={currentStep === 0}>
          <Scraping />
        </AnimationPresenceDisplay>
      </Stack>
    </Stack>
  );
}
