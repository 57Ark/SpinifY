import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import AnimationPresenceDisplay from "components/elements/AnimationPresenceDisplay/AnimationPresenceDisplay";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { CaretRight } from "phosphor-react";
import { useCallback, useEffect } from "react";
import { getAccessToken, redirectToAuthCodeFlow } from "utils/spotifyLogIn";
import { isString } from "utils/typeGuards";

import { spotifyTokenAtom, stepAtom } from "../../../utils/store";

export default function SpotifyLogin() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useAtom(stepAtom);
  const [spotifyToken, setSpotifyToken] = useAtom(spotifyTokenAtom);

  const logIn = useCallback(async () => {
    await redirectToAuthCodeFlow();
  }, []);

  useEffect(() => {
    (async () => {
      if (!spotifyToken && isString(router.query.code)) {
        try {
          const token = await getAccessToken(router.query.code);

          if (token) {
            setSpotifyToken(token);
            if (currentStep < 1) {
              setCurrentStep(1);
            }
          }
        } catch {
          router.push("/");
        }
      } else if (
        (!isString(router.query.code) || !spotifyToken) &&
        currentStep > 0
      ) {
        setCurrentStep(0);
      }
    })();
  }, [spotifyToken, currentStep, router, setCurrentStep, setSpotifyToken]);

  return (
    <Stack spacing={{ base: "32px", md: "48px" }}>
      <Text variant={"title"}>Log in with your Spotify</Text>

      <AnimationPresenceDisplay presence={currentStep === 0}>
        <HStack justify={"center"}>
          <Button
            onClick={logIn}
            type="submit"
            variant={"main"}
            rightIcon={<CaretRight size={16} weight="bold" />}
          >
            Log In
          </Button>
        </HStack>
      </AnimationPresenceDisplay>
    </Stack>
  );
}
