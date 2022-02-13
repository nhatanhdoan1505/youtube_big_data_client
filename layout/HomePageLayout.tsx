import { Box, Center, Container, Stack } from "@chakra-ui/react";
import { Footer } from "@component/common/Footer";
import { Header, NavBar } from "@component/common/index";
import { ILayoutProps } from "@models/common";
import React from "react";

export function HomePageLayout({ children }: ILayoutProps) {
  return (
    <Center>
      <Container maxWidth={{ lg: "3718px" }}>
        <Stack minHeight="100vh">
          <Header title="YoutubeData - Home" />
          <NavBar />
          <Box as="main" flexGrow={1}>
            {children}
          </Box>
          <Footer />
        </Stack>
      </Container>
    </Center>
  );
}
