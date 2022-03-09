import { Grid, Heading, HStack } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import { MenuItem, SearchBox } from "@component/ui";
import { Link } from "@chakra-ui/react";

interface Props {}

export function NavBar({}: Props): ReactElement {
  return (
    <>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        position="fixed"
        backgroundColor="#FFFFFF"
        zIndex={100}
        py={3}
        px={2}
      >
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Heading size="md">Youtube</Heading>
        </Link>
        <Grid templateColumns="repeat(5, 1fr)">
          <MenuItem title="Top Video" href="/topList/topVideo/mostViews/1" />
          <MenuItem title="Top Channel" href="/" />
          <MenuItem title="Top Hashtag" href="/" />
          <MenuItem title="History" href="/" />
          <MenuItem title="Statistic" href="/" />
        </Grid>
        <SearchBox />
      </HStack>
    </>
  );
}
