import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AnimationPresenceDisplay from "components/elements/AnimationPresenceDisplay/AnimationPresenceDisplay";
import {
  useGrayIconColor,
  useHelperIconColor,
  useTextGrayColor,
} from "hooks/ui";
import { useAtom } from "jotai";
import { CaretLeft, CaretRight, Confetti, MaskSad } from "phosphor-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { array, boolean, object } from "yup";

import { spotifyTokenAtom, stepAtom, userIdAtom } from "../../../utils/store";
import PlaylistCard from "./PlaylistCard";
import {
  GetPlaylistsResponse,
  PlaylistsSelectorFormValues,
} from "./PlaylistsSelector.utils";

const formSchema = {
  isSelected: boolean(),
};

const validationSchema = object({
  playlists: array()
    .of(object().shape(formSchema))
    .test("isSelected", "You must select at least one playlist", (value) => {
      if (value && value.length > 0) {
        const selected = value.find((field) => field.isSelected);
        return selected !== undefined;
      }
      return true;
    }),
});

export default function PlaylistsSelector() {
  const [currentStep, setCurrentStep] = useAtom(stepAtom);
  const [userId] = useAtom(userIdAtom);

  const [spotifyToken] = useAtom(spotifyTokenAtom);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const grayColor = useTextGrayColor();
  const iconColor = useHelperIconColor();
  const grayIconColor = useGrayIconColor();

  const { data: userPlaylists, isError } = useQuery({
    enabled: !!userId,
    queryKey: ["getUserPlaylists", { userId }],
    queryFn: () =>
      axios.get<GetPlaylistsResponse>(`/api/getPlaylists?username=${userId}`),
    select: (data) => data.data,
    staleTime: 259200000,
  });

  const rhfMethods = useForm<PlaylistsSelectorFormValues>({
    defaultValues: {
      playlists: [],
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = rhfMethods;

  const fieldArrayMethods = useFieldArray<PlaylistsSelectorFormValues>({
    name: "playlists",
    control,
  });

  const { fields, append, update } = fieldArrayMethods;

  useEffect(() => {
    if (userPlaylists && userPlaylists.length > 0 && fields.length === 0) {
      userPlaylists.forEach((_, index) => {
        if (index === 0) {
          append({ isSelected: true });
        } else {
          append({ isSelected: false });
        }
      });
    }
  }, [append, fields.length, userPlaylists]);

  const collectPlaylists = useCallback(
    async (formData: PlaylistsSelectorFormValues) => {
      setIsLoading(true);
      const selectedPlaylists = userPlaylists?.filter(
        (_, index) => formData.playlists[index].isSelected
      );

      if (selectedPlaylists && selectedPlaylists.length > 0) {
        const { data: profile } = await axios.get<{ id: string }>(
          "https://api.spotify.com/v1/me",
          {
            headers: {
              Authorization: `Bearer ${spotifyToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const songs = await Promise.all(
          selectedPlaylists.map((playlist) =>
            axios.get(
              `/api/getSongs?username=${userId}&playlistId=${
                playlist.link.split("/playlists/")[1]
              }`
            )
          )
        );

        await Promise.all(
          selectedPlaylists.map((playlist, index) =>
            axios.post<{ id: string }>("/api/createPlaylist", {
              userId: profile.id,
              title: playlist.title,
              songs: songs[index].data,
              accessToken: spotifyToken,
            })
          )
        );

        setIsLoading(false);
        setCurrentStep(3);
      }
    },
    [spotifyToken, setCurrentStep, userPlaylists, userId]
  );

  const MainAction = useMemo(() => {
    const MainButton =
      (userPlaylists && userPlaylists.length === 0) || isError ? (
        <Button
          onClick={() => setCurrentStep(1)}
          variant={"additional"}
          leftIcon={<CaretLeft size={16} weight="bold" />}
        >
          Go back
        </Button>
      ) : (
        <HStack>
          <Button
            onClick={() => setCurrentStep(1)}
            variant={"additional"}
            leftIcon={<CaretLeft size={16} weight="bold" />}
          >
            Go back
          </Button>

          <Button
            isDisabled={userPlaylists === undefined || !isValid}
            onClick={handleSubmit(collectPlaylists)}
            type="submit"
            variant={"main"}
            rightIcon={<CaretRight size={16} weight="bold" />}
            isLoading={isLoading}
          >
            Transfer playlists
          </Button>
        </HStack>
      );

    return (
      <AnimationPresenceDisplay presence={currentStep <= 2}>
        <HStack justify={"center"}>{MainButton}</HStack>
      </AnimationPresenceDisplay>
    );
  }, [
    collectPlaylists,
    currentStep,
    handleSubmit,
    isError,
    isValid,
    setCurrentStep,
    userPlaylists,
    isLoading,
  ]);

  // TODO: select all

  return (
    <Stack spacing={{ base: "32px", md: "48px" }}>
      <Stack spacing={"20px"}>
        <Stack spacing={"4px"}>
          <Text variant={"title"}>Select your playlists</Text>
          <HStack spacing="4px" align={"center"} textColor={grayColor}>
            <Confetti size={14} weight="fill" color={iconColor} />
            <Text variant={"note"} lineHeight={"80%"}>
              Click on playlists you want to transfer
            </Text>
          </HStack>
        </Stack>

        {userPlaylists === undefined && !isError ? (
          //TODO: add loader
          <Text variant={"subtitle"}>loading...</Text>
        ) : isError || userPlaylists.length === 0 ? (
          <VStack
            spacing={"12px"}
            pt={{ base: "12px", md: "28px" }}
            textAlign={"center"}
          >
            <MaskSad size={60} weight="fill" color={grayIconColor} />
            <VStack spacing={0}>
              <Text variant={"subtitle"}>Oooops... Nothing Found</Text>
              <Text>
                Make sure you entered valid User Id and your playlists are
                public
              </Text>
            </VStack>
          </VStack>
        ) : (
          <FormProvider {...rhfMethods}>
            <FormControl isInvalid={!!errors.playlists}>
              <Wrap spacingX={"4px"} spacingY={0}>
                {fields.map((field, index) => (
                  <WrapItem key={index}>
                    <PlaylistCard
                      index={index}
                      update={update}
                      isSelected={field.isSelected}
                      playListInfo={userPlaylists[index]}
                    />
                  </WrapItem>
                ))}
              </Wrap>
              <Box mt={"4px"} h="16px">
                <FormErrorMessage mt={0}>
                  {errors.playlists?.message}
                </FormErrorMessage>
              </Box>
            </FormControl>
          </FormProvider>
        )}
      </Stack>

      {MainAction}

      {currentStep >= 3 && (
        <Text variant={"title"}>{`Transfered ${
          fields.filter((field) => field.isSelected).length
        } playlist${
          fields.filter((field) => field.isSelected).length > 1 ? "s" : ""
        }!`}</Text>
      )}
    </Stack>
  );
}
