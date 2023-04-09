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
import { useCallback, useEffect, useMemo } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { array, boolean, object } from "yup";

import { playlistIdListAtom, stepAtom, userIdAtom } from "../../../utils/store";
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
  const [, setPlaylistIdList] = useAtom(playlistIdListAtom);

  const grayColor = useTextGrayColor();
  const iconColor = useHelperIconColor();
  const grayIconColor = useGrayIconColor();

  const { data: userPlaylists, isError } = useQuery({
    enabled: !!userId,
    queryKey: ["getUserPlaylists", { userId }],
    queryFn: () =>
      axios.get<GetPlaylistsResponse>(`/api/getPlaylists?username=${userId}`),
    select: (data) => data.data.data,
    // staleTime: 259200000,
    staleTime: 0,
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
        console.log(index);

        if (index === 0) {
          append({ isSelected: true });
        } else {
          append({ isSelected: false });
        }
      });
    }
  }, [append, fields.length, userPlaylists]);

  const collectPlaylists = useCallback(() => {
    if (userPlaylists) {
      const idList = userPlaylists
        .map(({ link }) => {
          try {
            return link.split("/playlists/")[0];
          } catch {
            return undefined;
          }
        })
        .filter((_, index) => fields[index].isSelected)
        .filter((id) => id !== undefined) as string[];

      setPlaylistIdList(idList);
      setCurrentStep(2);
    }
  }, [fields, setCurrentStep, setPlaylistIdList, userPlaylists]);

  const MainAction = useMemo(() => {
    const MainButton =
      (userPlaylists && userPlaylists.length === 0) || isError ? (
        <Button
          onClick={() => setCurrentStep(0)}
          variant={"additional"}
          leftIcon={<CaretLeft size={16} weight="bold" />}
        >
          Go back
        </Button>
      ) : (
        <Button
          isDisabled={userPlaylists === undefined || !isValid}
          onClick={handleSubmit(collectPlaylists)}
          type="submit"
          variant={"main"}
          rightIcon={<CaretRight size={16} weight="bold" />}
        >
          Transfer playlists
        </Button>
      );

    return (
      <AnimationPresenceDisplay presence={currentStep <= 1}>
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
  ]);

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
    </Stack>
  );
}
