import { Box, Container, VStack } from "@chakra-ui/react";
import { Footer } from "@component/common/footer";
import { Header, NavBar } from "@component/common/index";
import { ILayoutProps } from "@models/common";
import React from "react";

export function MainLayout({ children }: ILayoutProps) {
  return (
    <Container w="100%" maxWidth={{ lg: "3718px" }}>
      <VStack minHeight="100vh" w="100%">
        <NavBar />
        <Box as="main" flexGrow={1} w="100%" py="100px">
          {children}
        </Box>
        <Footer />
      </VStack>
    </Container>
  );
}
