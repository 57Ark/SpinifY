import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

import BottomNavigation from "./BottomNavigation/BottomNavigation";
import TopNavigation from "./TopNavigation/TopNavigation";

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<TopNavigation />
			<BottomNavigation />

			<>
				<Flex
					direction={"column"}
					as="main"
					w={"full"}
					mx="auto"
					align={"center"}
					px={{ base: "16px", lg: "32px" }}
					pt={{ base: "12px", lg: "32px" }}
					pb={{ base: "48px", lg: "32px" }}
				>
					<Box w="full" maxW="880px">
						{children}
					</Box>
				</Flex>
			</>
		</>
	);
}
