import { Search2Icon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { HStack } from "@chakra-ui/layout";
import { ReactElement } from "react";

interface Props {}

export function SearchBox(): ReactElement {
  return (
    <>
      <HStack backgroundColor="white" borderRadius="base" px={2}>
        <Input placeholder="Search" type="text" border="1px solid #22577E" />
        <Search2Icon />
      </HStack>
    </>
  );
}
