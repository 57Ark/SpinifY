import {
  Button,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { RocketLaunch } from "phosphor-react";

import AnimationPresenceDisplay from "../../../components/elements/AnimationPresenceDisplay/AnimationPresenceDisplay";
import { stepAtom } from "../../../utils/store";

export default function Header() {
  const [currentStep, setCurrentStep] = useAtom(stepAtom);

  return (
    <Stack spacing={{ base: "32px", md: "48px" }}>
      <Stack spacing={{ base: "12px", md: "20px" }}>
        <Text variant={"head"}>SpinifY</Text>
        <Stack spacing={0}>
          <Text variant={"title"}>
            Transfer Yandex Music Playlists to Spotify
          </Text>
          <Text>
            Simple, Fast, and User-Friendly Playlist Conversion for Music
            Lovers.
          </Text>
        </Stack>
      </Stack>

      <AnimationPresenceDisplay presence={currentStep === -1}>
        <Stack pl={{ base: "12px", md: "20px" }} spacing={0}>
          <Text variant={"subtitle"}>What should I do?</Text>
          <UnorderedList pl={"16px"}>
            <ListItem>
              <Text>Provide your Yandex account id</Text>
            </ListItem>
            <ListItem>
              <Text>Select playlist you want to transfer</Text>
            </ListItem>
            <ListItem>
              <Text>Provide your Spotify account id</Text>
            </ListItem>
            <ListItem>
              <Text>Sit and relax</Text>
            </ListItem>
          </UnorderedList>
        </Stack>
      </AnimationPresenceDisplay>

      <AnimationPresenceDisplay presence={currentStep === -1}>
        <HStack justify={"center"}>
          <Button
            rightIcon={<RocketLaunch size={20} weight="bold" />}
            onClick={() => setCurrentStep(0)}
            variant={"main"}
          >
            Let&apos;s start
          </Button>
        </HStack>
      </AnimationPresenceDisplay>
    </Stack>
  );
}
