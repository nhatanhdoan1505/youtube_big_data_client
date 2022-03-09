import { GridItem, Grid, VStack, Text, HStack } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import {
  AiFillTwitterCircle,
  AiOutlineFacebook,
  AiOutlineInstagram,
} from "react-icons/ai";

export function FooterInformationColumn() {
  return (
    <Grid templateColumns="repeat(5, 1fr)">
      <GridItem colSpan={2}>
        <VStack spacing={3}>
          <Text as="h2" color="#212529" fontWeight="bold">
            About Us
          </Text>
          <Text as="p" color="#000000" fontWeight="light">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia.
          </Text>
          <HStack>
            <Icon as={AiFillTwitterCircle} />
            <Icon as={AiOutlineFacebook} />
            <Icon as={AiOutlineInstagram} />
          </HStack>
        </VStack>
      </GridItem>
      <GridItem>
        <VStack spacing={2} justifyContent="center" alignItems="flex-start">
          <Text as="h2" color="#212529" fontWeight="bold">
            Information
          </Text>
          <Text as="p" color="#000000" fontWeight="light">
            Address: Vietnam
          </Text>
          <Text as="p" color="#000000" fontWeight="light">
            Phone: 01234567
          </Text>
          <Text as="p" color="#000000" fontWeight="light">
            Email: email@gmail.com
          </Text>
        </VStack>
      </GridItem>
      <GridItem>
        <VStack spacing={2} justifyContent="center" alignItems="flex-start">
          <Text as="h2" color="#212529" fontWeight="bold">
            Product
          </Text>
          <Text as="p" color="#000000" fontWeight="light">
            Pricing
          </Text>
        </VStack>
      </GridItem>
      <GridItem>
        <VStack spacing={2} justifyContent="center" alignItems="flex-start">
          <Text as="h2" color="#212529" fontWeight="bold">
            Policy
          </Text>
          <Text as="p" color="#000000" fontWeight="light">
            Term of Use
          </Text>
          <Text as="p" color="#000000" fontWeight="light">
            YouTube's Terms of Service Google Privacy Policy
          </Text>
        </VStack>
      </GridItem>
    </Grid>
  );
}
