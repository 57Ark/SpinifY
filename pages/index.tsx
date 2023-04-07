import { Box, Stack } from "@chakra-ui/react";

import AnimationPresenceDisplay from "../components/elements/AnimationPresenceDisplay/AnimationPresenceDisplay";
import Progress from "../components/elements/Progress/Progress";
import Header from "../components/modules/Header/Header";
import Scraping from "../components/modules/Scraping/Scraping";
import { stepAtom } from "../utils/store";

export default function Home() {
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
        <AnimationPresenceDisplay presence={false}>
          <Box py={"48px"}>
            <Progress length={3} currentStep={1} direction="column" />
          </Box>
        </AnimationPresenceDisplay>
      </Box>

      <Stack
        spacing={{ base: "32px", md: "48px" }}
        py={{ base: "32px", md: "48px" }}
      >
        <AnimationPresenceDisplay presence={false}>
          <Scraping />
        </AnimationPresenceDisplay>
      </Stack>
    </Stack>
  );
}
