import { HStack, VStack, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export function HotElement({ title, href, children }) {
  const router = useRouter();

  const handlerClickMore = () => {
    router.push(href);
  };
  return (
    <VStack w="100%">
      <HStack
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        px={3}
      >
        <Text as="h4" fontWeight="bold" color="#4a4a4a">
          {title}
        </Text>
        <Button colorScheme="pink" size="sm" onClick={handlerClickMore}>
          More
        </Button>
      </HStack>
      {children}
    </VStack>
  );
}
