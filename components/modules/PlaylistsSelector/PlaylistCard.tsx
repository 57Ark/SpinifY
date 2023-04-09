import {
  Box,
  Checkbox,
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import SelectableCard from "components/elements/SelectableCard/SelectableCard";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { UseFieldArrayUpdate } from "react-hook-form";
import { stepAtom } from "utils/store";

import {
  PlaylistsSelectorFormValues,
  YandexPlaylist,
} from "./PlaylistsSelector.utils";

export interface PlaylistCardProps {
  index: number;
  update: UseFieldArrayUpdate<PlaylistsSelectorFormValues, "playlists">;
  isSelected: boolean;
  playListInfo?: YandexPlaylist;
}

export default function PlaylistCard({
  index,
  update,
  isSelected,
  playListInfo,
}: PlaylistCardProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [currentStep] = useAtom(stepAtom);

  const PlaylistImage = useMemo(() => {
    if (!playListInfo) {
      return <></>;
    }
    if (playListInfo?.srcList.length >= 4) {
      return (
        <Grid
          templateRows={{ base: "repeat(2, 56px)", md: "repeat(2, 80px)" }}
          templateColumns={{ base: "repeat(2, 56px)", md: "repeat(2, 80px)" }}
          gap={0}
        >
          {playListInfo.srcList.slice(0, 4).map((src, index) => {
            const preparedSrc = src.includes("yandex.")
              ? src
              : `https://music.yandex.ru${src}`;
            return (
              <GridItem colSpan={1} rowSpan={1} key={index}>
                <Image
                  src={preparedSrc}
                  maxW={{
                    base: "56px",
                    md: "80px",
                  }}
                  w={{
                    base: "56px",
                    md: "80px",
                  }}
                  h={{
                    base: "56px",
                    md: "80px",
                  }}
                  alt={`${playListInfo.title}-image-${index}`}
                  borderTopLeftRadius={index === 0 ? "8px" : 0}
                  borderTopRightRadius={index === 1 ? "8px" : 0}
                  borderBottomLeftRadius={index === 2 ? "8px" : 0}
                  borderBottomRightRadius={index === 3 ? "8px" : 0}
                />
              </GridItem>
            );
          })}
        </Grid>
      );
    }

    const preparedSrc = playListInfo.srcList[0].includes("yandex.")
      ? playListInfo.srcList[0]
      : `https://music.yandex.ru${playListInfo.srcList[0]}`;
    return (
      <Image
        src={preparedSrc}
        borderRadius="8px"
        boxSize={{
          base: "112px",
          md: "160px",
        }}
        alt={`${playListInfo.title}-image`}
      />
    );
  }, [playListInfo]);

  if (!playListInfo) {
    return <></>;
  }

  return (
    <motion.div
      onHoverStart={() => setIsHover(currentStep === 1 && true)}
      onHoverEnd={() => setIsHover(false)}
    >
      <SelectableCard
        isSelected={isSelected}
        w="fit-content"
        isDisabled={currentStep !== 1}
        onClick={() =>
          update(index, {
            isSelected: !isSelected,
          })
        }
      >
        <Stack spacing={"12px"}>
          {PlaylistImage}
          <HStack
            spacing={"8px"}
            maxW={{
              base: "112px",
              md: "160px",
            }}
            align={"center"}
          >
            <Box
              style={
                currentStep === 1 && isHover
                  ? {
                      filter: "drop-shadow(0 0 2px #6366F1)",
                      msFilter: "drop-shadow(0 0 2px #6366F1)",
                      WebkitFilter: "drop-shadow(0 0 2px #6366F1)",
                    }
                  : undefined
              }
              h={{ base: "14px", md: "16px" }}
            >
              <Checkbox
                colorScheme="black"
                size={{ base: "sm", md: "md" }}
                isChecked={isSelected}
                isDisabled={currentStep !== 1}
              />
            </Box>
            <Text isTruncated>{playListInfo.title}</Text>
          </HStack>
        </Stack>
      </SelectableCard>
    </motion.div>
  );
}
