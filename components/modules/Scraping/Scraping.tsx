import { Button, HStack, Input, Link, Stack, Text } from "@chakra-ui/react";
import AnimationPresenceDisplay from "components/elements/AnimationPresenceDisplay/AnimationPresenceDisplay";
import { useHelperIconColor, useTextColor, useTextGrayColor } from "hooks/ui";
import { useAtom } from "jotai";
import { Confetti } from "phosphor-react";
import { useMemo, useState } from "react";

import { stepAtom } from "../../../utils/store";

export default function Scraping() {
  const [, setCurrentStep] = useAtom(stepAtom);

  const [isIdInput, setIsIdInput] = useState<boolean>(true);
  const grayColor = useTextGrayColor();
  const textColor = useTextColor();
  const iconColor = useHelperIconColor();

  // const fc = async () => {
  //   try {
  //     const response = await axios.get(
  //       "/api/getPlaylists?username=v4dimgorbatov"
  //     );
  //     // arkhip.voubd
  //     // nika.chekina
  //     // v4dimgorbatov

  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fc2 = async () => {
  //   try {
  //     const response = await axios.get(
  //       "/api/getSongs?playlistId=3&username=v4dimgorbatov"
  //     );

  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const MainAction = useMemo(
    () => (
      <HStack justify={"center"}>
        {/* TODO: добавить обработку случаев (внутри апи), когда неправильный юзер, или закрытый аккаунт */}
        <Button onClick={() => setCurrentStep(1)} variant={"main"}>
          Find playlists
        </Button>
      </HStack>
    ),
    [setCurrentStep]
  );

  // добавить пометку, что плейлисты должны быть открыты
  return (
    <>
      <AnimationPresenceDisplay presence={isIdInput}>
        <Stack spacing={{ base: "32px", md: "48px" }}>
          <Stack spacing={"20px"}>
            <Stack spacing={"4px"}>
              <Text variant={"title"}>Input your Yandex account ID</Text>
              <Link isExternal href="https://yandex.com/support/id/">
                <HStack
                  spacing="4px"
                  align={"center"}
                  textColor={grayColor}
                  _hover={{
                    textColor: textColor,
                  }}
                >
                  <Confetti size={14} weight="fill" color={iconColor} />
                  <Text variant={"note"} lineHeight={"80%"}>
                    What is Yandex ID?
                  </Text>
                </HStack>
              </Link>
            </Stack>
            <HStack justify={"space-between"}>
              <Input maxW="480px" placeholder="username" />

              <Button
                variant={"additional"}
                onClick={() => setIsIdInput(!isIdInput)}
              >
                Can&apos;t find my ID
              </Button>
            </HStack>
          </Stack>

          {MainAction}
        </Stack>
      </AnimationPresenceDisplay>

      <AnimationPresenceDisplay presence={!isIdInput}>
        <Stack spacing={{ base: "32px", md: "48px" }}>
          <Stack spacing={"20px"}>
            <Text variant={"title"}>
              Input link to your Yandex account or your playlist
            </Text>
            <HStack justify={"space-between"}>
              <Input
                maxW="480px"
                placeholder="https://music.yandex.ru/users/..."
              />

              <Button
                variant={"additional"}
                onClick={() => setIsIdInput(!isIdInput)}
              >
                Or input ID
              </Button>
            </HStack>
          </Stack>

          {MainAction}
        </Stack>
      </AnimationPresenceDisplay>
    </>
  );
}
