import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import AnimationPresenceDisplay from "components/elements/AnimationPresenceDisplay/AnimationPresenceDisplay";
import { useHelperIconColor, useTextColor, useTextGrayColor } from "hooks/ui";
import { useAtom } from "jotai";
import { Confetti } from "phosphor-react";
import { useCallback, useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";

import { stepAtom, userIdAtom } from "../../../utils/store";

export interface ScrapingFromProps {
  link: string;
  userId: string;
  isIdInput: boolean;
}

const validationSchema = object({
  link: string()
    .test("isLink", "This is required", (value, context) => {
      if (context.parent.isIdInput) {
        return true;
      }
      return !!value;
    })
    .test("isValidLink", "Invalid link", (value, context) => {
      if (value && !context.parent.isIdInput) {
        if (!value.includes("yandex.ru")) {
          return false;
        }

        try {
          const userId = value.split("users")[1].split("/")[1];
          return !!userId;
        } catch {
          return false;
        }
      }
      return true;
    }),
  userId: string().test("isUserId", "This is required", (value, context) => {
    if (!context.parent.isIdInput) {
      return true;
    }
    return !!value;
  }),
});

export default function Scraping() {
  const [currentStep, setCurrentStep] = useAtom(stepAtom);
  const [, setUserId] = useAtom(userIdAtom);

  const grayColor = useTextGrayColor();
  const textColor = useTextColor();
  const iconColor = useHelperIconColor();

  const rhfMethods = useForm<ScrapingFromProps>({
    defaultValues: {
      isIdInput: true,
      link: "",
      userId: "",
    },
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = rhfMethods;

  const wacthedValues = watch();

  const findPlaylists = useCallback(
    (formData: ScrapingFromProps) => {
      if (formData.isIdInput) {
        setUserId(formData.userId);
        console.log(formData.userId);
      } else {
        const userId = formData.link.split("users")[1].split("/")[1];
        setUserId(userId);
        console.log(userId);
      }
      setCurrentStep(1);
    },
    [setCurrentStep, setUserId]
  );

  const MainAction = useMemo(
    () => (
      <AnimationPresenceDisplay presence={currentStep === 0}>
        <HStack justify={"center"}>
          <Button
            onClick={handleSubmit(findPlaylists)}
            type="submit"
            variant={"main"}
          >
            Find playlists
          </Button>
        </HStack>
      </AnimationPresenceDisplay>
    ),
    [currentStep, findPlaylists, handleSubmit]
  );

  return (
    <FormProvider {...rhfMethods}>
      <AnimationPresenceDisplay presence={wacthedValues.isIdInput}>
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
            <FormControl isInvalid={!!errors.userId}>
              <HStack justify={"space-between"}>
                <Controller
                  name="userId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="username"
                      maxW="480px"
                      isDisabled={currentStep !== 0}
                    />
                  )}
                />

                <AnimationPresenceDisplay presence={currentStep === 0}>
                  <Button
                    variant={"additional"}
                    onClick={() => setValue("isIdInput", false)}
                  >
                    Can&apos;t find my ID
                  </Button>
                </AnimationPresenceDisplay>
              </HStack>
              <Box mt={"4px"} h="16px">
                <FormErrorMessage mt={0}>
                  {errors.userId?.message}
                </FormErrorMessage>
              </Box>
            </FormControl>
          </Stack>

          {MainAction}
        </Stack>
      </AnimationPresenceDisplay>

      <AnimationPresenceDisplay presence={!wacthedValues.isIdInput}>
        <Stack spacing={{ base: "32px", md: "48px" }}>
          <Stack spacing={"20px"}>
            <Text variant={"title"}>
              Input link to your Yandex account or your playlist
            </Text>

            <FormControl isInvalid={!!errors.link}>
              <HStack justify={"space-between"}>
                <Controller
                  name="link"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="https://music.yandex.ru/users/..."
                      maxW="480px"
                      isDisabled={currentStep !== 0}
                    />
                  )}
                />

                <AnimationPresenceDisplay presence={currentStep === 0}>
                  <Button
                    variant={"additional"}
                    onClick={() => setValue("isIdInput", true)}
                  >
                    Or input ID
                  </Button>
                </AnimationPresenceDisplay>
              </HStack>
              <Box mt={"4px"} h="16px">
                <FormErrorMessage mt={0}>
                  {errors.link?.message}
                </FormErrorMessage>
              </Box>
            </FormControl>
          </Stack>

          {MainAction}
        </Stack>
      </AnimationPresenceDisplay>
    </FormProvider>
  );
}
