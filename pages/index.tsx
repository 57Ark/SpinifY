import { Button, Stack } from "@chakra-ui/react";
import axios from "axios";

export default function Home() {
  const fc = async () => {
    try {
      const response = await axios.get(
        "/api/getPlaylists?username=v4dimgorbatov"
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fc2 = async () => {
    try {
      const response = await axios.get(
        "/api/getSongs?playlistId=3&username=v4dimgorbatov"
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // добавить пометку, что плейлисты должны быть открыты
  return (
    <Stack>
      <Button onClick={() => fc()}>Click me</Button>
      <Button onClick={() => fc2()}>Or me</Button>
    </Stack>
  );
}
