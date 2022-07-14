import { useAppSelector } from "@app/index";
import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useVsCompetitorSubscriber, useVsCompetitorViews } from "@hook/index";
import { selectUserProfile } from "@store/user";
import { CompetitorChart } from ".";

export function VsCompetitor() {
  const userProfileSelector = useAppSelector(selectUserProfile);
  const { vsCompetitorViews } = useVsCompetitorViews(userProfileSelector);
  const { vsCompetitorSubscriber } =
    useVsCompetitorSubscriber(userProfileSelector);

  return (
    <VStack w="100%">
      <HStack w="100%" boxShadow="base" borderRadius="8px" p={3}>
        <Image
          src={userProfileSelector.channel.channelThumbnail}
          alt={userProfileSelector?.channel?.title}
          maxWidth="60px"
          borderRadius="50%"
        />
        <Text fontSize="xl" fontWeight="extrabold">
          {userProfileSelector?.channel.title}
        </Text>
      </HStack>
      {vsCompetitorViews ? (
        <VStack
          w="100%"
          boxShadow="base"
          borderRadius="8px"
          p={3}
          alignItems="flex-start"
        >
          <Text fontWeight="bold">View History</Text>
          <CompetitorChart {...vsCompetitorViews} />
        </VStack>
      ) : null}
      {vsCompetitorSubscriber ? (
        <VStack
          w="100%"
          boxShadow="base"
          borderRadius="8px"
          p={3}
          alignItems="flex-start"
        >
          <Text fontWeight="bold">Subscriber History</Text>
          <CompetitorChart {...vsCompetitorSubscriber} />
        </VStack>
      ) : null}
    </VStack>
  );
}
