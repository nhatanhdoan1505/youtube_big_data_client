import { Input } from "@chakra-ui/input";
import { HStack } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import { Search2Icon } from "@chakra-ui/icons";

interface Props {}

export function SearchBox({}: Props): ReactElement {
  return (
    <>
      <HStack backgroundColor="white" borderRadius="base" px={2}>
        <Input placeholder="Search" type="text" border="1px solid #22577E" />
        <Search2Icon />
      </HStack>
    </>
  );
}
