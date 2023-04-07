import { Button, HStack, Input, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useAtom } from "jotai";
import { useState } from "react";

import { stepAtom } from "../../../utils/store";

export default function Scraping() {
  const [, setCurrentStep] = useAtom(stepAtom);

  const [isIdInput, setIsIdInput] = useState<boolean>(true);

  const fc = async () => {
    try {
      const response = await axios.get(
        "/api/getPlaylists?username=v4dimgorbatov"
      );
      // arkhip.voubd
      // nika.chekina
      // v4dimgorbatov

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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

  // добавить пометку, что плейлисты должны быть открыты
  return (
    <Stack spacing={{ base: "32px", md: "48px" }}>
      <Stack spacing={"20px"}>
        <Text variant={"title"}>
          {isIdInput
            ? "Input your Yandex account ID"
            : "Input link to your Yandex account or your playlist"}
        </Text>
        <HStack justify={"space-between"}>
          <Input maxW="480px" />

          <Button
            variant={"additional"}
            onClick={() => {
              setIsIdInput(!isIdInput), fc();
            }}
          >
            {isIdInput ? "Can't find my ID" : "Or input ID"}
          </Button>
        </HStack>
      </Stack>

      <HStack justify={"center"}>
        {/* TODO: добавить обработку случаев (внутри апи), когда неправильный юзер, или закрытый аккаунт */}
        <Button onClick={() => setCurrentStep(1)} variant={"main"}>
          Find playlists
        </Button>
      </HStack>
    </Stack>
  );
}
