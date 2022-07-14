import { useAppSelector } from "@app/index";
import { HStack, Text } from "@chakra-ui/react";
import { selectUserProfile } from "@store/user";
import { useRouter } from "next/router";

export function HiddenPanel() {
  const userProfileSelector = useAppSelector(selectUserProfile);
  const router = useRouter();
  return (
    <HStack
      position="absolute"
      w="100%"
      height="50%"
      zIndex="1000"
      backgroundColor="#B25068"
      top="600px"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Text
        color="white"
        fontWeight="bold"
        fontSize="2rem"
        letterSpacing="widest"
        onClick={
          userProfileSelector
            ? () => router.push("/myPage/editProfile")
            : () => router.push("/login")
        }
        _hover={{ cursor: "pointer" }}
        mt={16}
      >
        Upgrade to Premium for full information
      </Text>
    </HStack>
  );
}
