import { Button, FormControl, Text, VStack } from "@chakra-ui/react";
import { InputField } from "@component/ui/";

export function FooterContactForm() {
  return (
    <VStack justifyContent="center" alignItems="flex-start">
      <Text as="h6" fontWeight="bold" mb={4}>
        Contact US
      </Text>
      <FormControl>
        <InputField type="text" placeholder="Your Name" textarea={false} />
        <InputField type="email" placeholder="Your Email" textarea={false} />
        <InputField type="text" placeholder="Subject" textarea={false} />
        <InputField type="text" placeholder="Content" textarea={true} />
        <Button colorScheme="green">Send</Button>
      </FormControl>
    </VStack>
  );
}
