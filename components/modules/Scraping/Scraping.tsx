import { Button, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";

import { stepAtom } from "@/utils/store";

export default function Scraping() {
  const [, setCurrentStep] = useAtom(stepAtom);

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

  // добавить пометку, что плейлисты должны быть открыты
  return (
    <Stack spacing={{ base: "32px", md: "48px" }}>
      <Stack spacing={"20px"}>
        <Text variant={"title"}>Input your Yandex account ID</Text>
        <HStack justify={"space-between"}>
          <Input maxW="480px" />

          <Button variant={"additional"}>Can&apos;t find my ID</Button>
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
