import { Button, Stack } from "@chakra-ui/react";
import axios from "axios";

export default function Home() {
  const fc = async () => {
    try {
      const response = await axios.get("/api/tmp?username=v4dimgorbatov");

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack>
      <Button onClick={() => fc()}>Click me</Button>
    </Stack>
  );
}
