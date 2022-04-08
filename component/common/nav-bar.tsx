import { Grid, Heading, HStack } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import { MenuItem, SearchBox } from "@component/ui";
import { Link } from "@chakra-ui/react";
import { useAppSelector } from "@app/index";
import { selectYoutubeObject } from "@store/index";

interface Props {}

export function NavBar({}: Props): ReactElement {
  const youtubeObjectSelector = useAppSelector(selectYoutubeObject);
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
          <MenuItem
            title="Top Video"
            href="/topList/video/views/1"
            youtubeObject="video"
          />
          <MenuItem
            title="Top Channel"
            href="/topList/channel/views/1"
            youtubeObject="channel"
          />
          <MenuItem title="Top Hashtag" href="/" youtubeObject="hashtag" />
          {/* <MenuItem
            title="History"
            href="/"
            youtubeObject={youtubeObjectSelector}
          />
          <MenuItem
            title="Statistic"
            href="/"
            youtubeObject={youtubeObjectSelector}
          /> */}
        </Grid>
        <SearchBox />
      </HStack>
    </>
  );
}
