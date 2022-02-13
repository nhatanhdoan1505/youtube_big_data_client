import {
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import MenuItem from "./MenuItem";
import SearchBox from "./SearchBox";
import Banner from "./Banner";

interface Props {}

export function NavBar({}: Props): ReactElement {
  return (
    <>
      <HStack alignItems="center" justifyContent="space-between">
        <Heading size="md">Youtube</Heading>
        <HStack gap={6} mx="auto" spacing={4}>
          <MenuItem title="Top Video" href="/" />
          <MenuItem title="Top Channel" href="/" />
          <MenuItem title="Top Hashtag" href="/" />
          <MenuItem title="History" href="/" />
          <MenuItem title="Statistic" href="/" />
        </HStack>
        <SearchBox />
      </HStack>
    </>
  );
}
