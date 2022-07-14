import { userApi } from "@api/userApi";
import {
  VStack,
  Text,
  Checkbox,
  Divider,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export function PremiumModal() {
  const router = useRouter();
  const handlerClickCheckout = async () => {
    const url = await userApi.getCheckoutLink();
    if (!url) return;
    router.push(url);
  };
  return (
    <VStack p={8} w="100%" justifyContent="center">
      <Text
        fontWeight="bold"
        fontSize="xl"
        mb={4}
        color="red.400"
        letterSpacing="wider"
      >
        Your Payment
      </Text>
      <VStack alignItems="flex-start" justifyContent="flex-start" w="100%">
        <Checkbox isDisabled defaultChecked>
          Top List (All Data)
        </Checkbox>
        <Checkbox isDisabled defaultChecked>
          Top Channel (All Data)
        </Checkbox>
        <Checkbox isDisabled defaultChecked>
          My Channel Overview
        </Checkbox>
        <Checkbox isDisabled defaultChecked>
          My Channel vs Competitors
        </Checkbox>
        <Divider my={3} />
        <HStack justifyContent="space-between" w="100%">
          <Text>Order Summary</Text>
          <Text>Price in USD</Text>
        </HStack>
        <HStack justifyContent="flex-end" w="100%">
          <Text fontWeight="bold">10$ / Month</Text>
        </HStack>
        <Divider my={3} />
        <HStack pt={4} w="100%" justifyContent="flex-end">
          <Button colorScheme="red" onClick={handlerClickCheckout}>
            Check out
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
