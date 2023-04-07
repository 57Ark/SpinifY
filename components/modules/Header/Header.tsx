import {
  Button,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { RocketLaunch } from "phosphor-react";

import AnimationPresenceDisplay from "../../../components/elements/AnimationPresenceDisplay/AnimationPresenceDisplay";

export default function Header() {
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

      <AnimationPresenceDisplay presence={true}>
        <Stack pl={{ base: "12px", md: "20px" }} spacing={0}>
          <Text variant={"subtitle"}>What should I do?</Text>
          <UnorderedList pl={"16px"}>
            <ListItem>
              <Text>DAO creation</Text>
            </ListItem>
            <ListItem>
              <Text>Unlimited on-chain voting</Text>
            </ListItem>
            <ListItem>
              <Text>Unlimited off-chain proposals</Text>
            </ListItem>
            <ListItem>
              <Text>Basic functionality</Text>
            </ListItem>
            <ListItem>
              <Text>Up to 5 members</Text>
            </ListItem>
          </UnorderedList>
        </Stack>
      </AnimationPresenceDisplay>

      <AnimationPresenceDisplay presence={true}>
        <HStack justify={"center"}>
          <Button
            leftIcon={<RocketLaunch size={20} weight="bold" />}
            variant={"main"}
          >
            Let&apos;s start
          </Button>
        </HStack>
      </AnimationPresenceDisplay>
    </Stack>
  );
}
