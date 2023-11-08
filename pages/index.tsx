import { Box, Button, HStack, Stack } from "@chakra-ui/react";
import PlaylistsSelector from "components/modules/PlaylistsSelector/PlaylistsSelector";
import { useAtom } from "jotai";

import SpotifyLogin from "components/modules/SpotifyLogin/SpotifyLogin";
import { Repeat } from "phosphor-react";
import AnimationPresenceDisplay from "../components/elements/AnimationPresenceDisplay/AnimationPresenceDisplay";
import Progress from "../components/elements/Progress/Progress";
import Header from "../components/modules/Header/Header";
import YandexIdForm from "../components/modules/YandexIdForm/YandexIdForm";
import { stepAtom } from "../utils/store";

export default function Home() {
  const [currentStep, setCurrentStep] = useAtom(stepAtom);

  return (
    <Stack spacing={0}>
      <Header />

      <Box
        display={{ base: "none", lg: "initial" }}
        position={"sticky"}
        h="0"
        top="0"
        w="fit-content"
      >
        <Box position={"relative"} left="-48px">
          <AnimationPresenceDisplay presence={currentStep >= 0}>
            <Box py={"48px"}>
              <Progress
                length={3}
                currentStep={currentStep}
                direction="column"
              />
            </Box>
          </AnimationPresenceDisplay>
        </Box>
      </Box>

      <Stack
        spacing={{ base: "32px", md: "48px" }}
        py={{ base: "32px", md: "48px" }}
      >
        <AnimationPresenceDisplay presence={currentStep >= 0}>
          <SpotifyLogin />
        </AnimationPresenceDisplay>
        <AnimationPresenceDisplay presence={currentStep >= 1}>
          <YandexIdForm />
        </AnimationPresenceDisplay>
        <AnimationPresenceDisplay presence={currentStep >= 2}>
          <PlaylistsSelector />
        </AnimationPresenceDisplay>

        <AnimationPresenceDisplay presence={currentStep >= 3}>
          <HStack w="full" justify={"center"}>
            <Button
              onClick={() => setCurrentStep(1)}
              type="submit"
              variant={"main"}
              rightIcon={<Repeat size={16} weight="bold" />}
            >
              Start over
            </Button>
          </HStack>
        </AnimationPresenceDisplay>
      </Stack>
    </Stack>
  );
}
