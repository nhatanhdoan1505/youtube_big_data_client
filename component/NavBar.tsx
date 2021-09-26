import { Box, Flex, Heading, Link, Button } from "@chakra-ui/react";
import NextLink from "next/link";

export default function NavBar() {
  return (
    <Flex>
      <NextLink href="/create-post">
        <Button mr={4}>Create Post</Button>
      </NextLink>
      <Button>Logout</Button>
    </Flex>
  );
}
