import {
	Box,
	HStack,
	IconButton,
	useBreakpointValue,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoonStars, Sun } from "phosphor-react";
import { useMemo } from "react";

export default function TopNavigation() {
	const backgroundColor = useColorModeValue("244, 247, 251", "30, 30, 30");

	const bannerHeight = useBreakpointValue({ base: 120, md: 172 }) ?? 120;

	const { scrollY } = useScroll();

	const background = useTransform(
		scrollY,
		[0, bannerHeight],
		[`rgba(${backgroundColor}, 0)`, `rgba(${backgroundColor}, 1)`],
	);

	const { colorMode, toggleColorMode } = useColorMode();

	const ColorModeToggler = useMemo(
		() => (
			<IconButton
				size="icon"
				variant={"outline"}
				aria-label="toggle-color-mode"
				onClick={toggleColorMode}
				boxSize={{ base: "28px", md: "32px" }}
				icon={
					colorMode === "dark" ? (
						<Sun size={20} weight="fill" />
					) : (
						<MoonStars size={20} weight="fill" />
					)
				}
			/>
		),
		[colorMode, toggleColorMode],
	);

	// add logo and drawer
	return (
		<>
			<Box
				position="fixed"
				top="0"
				w="full"
				zIndex="popover"
				display={{ base: "initial", lg: "none" }}
			>
				<motion.div
					style={{
						background,
						width: "full",
						borderBottomLeftRadius: "10px",
						borderBottomRightRadius: "10px",
					}}
				>
					<HStack
						justify={"flex-end"}
						px={{ base: "8px", md: "12px" }}
						py={{ base: "4px", md: "6px" }}
						h={{ base: "44px", md: "48px" }}
					>
						{ColorModeToggler}
					</HStack>
				</motion.div>
			</Box>

			<Box
				position="fixed"
				top="0"
				right="0"
				w="fit-content"
				zIndex="popover"
				p={"12px"}
				h={"fit-content"}
				display={{ base: "none", lg: "initial" }}
			>
				{ColorModeToggler}
			</Box>
		</>
	);
}
