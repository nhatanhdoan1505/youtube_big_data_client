import { Box, HStack, Link, Text } from "@chakra-ui/layout";
import React, { ReactElement } from "react";

interface Props {
  title: string;
  href: string;
}

function MenuItem({ title, href }: Props): ReactElement {
  return (
    <>
      <HStack
        _hover={{ cursor: "pointer", backgroundColor: "#99A799" }}
        p={3}
        justifyContent="center"
        alignItems="center"
      >
        <Link
          href={href}
          color="blackAlpha.900"
          fontSize="15px"
          fontWeight="bold"
          _hover={{ textDecoration: "none" }}
        >
          <Text>{title}</Text>
        </Link>
      </HStack>
    </>
  );
}

export default MenuItem;
