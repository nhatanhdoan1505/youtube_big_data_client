import { Box, Container, useColorModeValue, VStack } from "@chakra-ui/react";
import { Footer, WithSubNavigation } from "@component/common";
import { ILayoutProps } from "@models/common";
import React from "react";

export function MainLayout({ children }: ILayoutProps) {
  return (
    <Container w="100%" maxWidth={{ lg: "3718px" }}>
      <VStack minHeight="100vh" w="100%">
        <WithSubNavigation />
        <Box
          as="main"
          flexGrow={1}
          w="100%"
          py="100px"
          bg={useColorModeValue("white.500", "white.200")}
        >
          {children}
        </Box>
        <Footer />
      </VStack>
    </Container>
  );
}
