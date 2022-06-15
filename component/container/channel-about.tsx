import { useAppSelector } from "@app/index";
import {
  Text,
  Grid,
  GridItem,
  HStack,
  VStack,
  Badge,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { selectChannelOverview } from "@store/index";
import { formatChannelTags } from "@utils/index";

export function ChannelAbout() {
  const channelOverviewSelector = useAppSelector(selectChannelOverview);
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      <GridItem colSpan={3}>
        <VStack>
          <Text fontWeight="bold">Description</Text>
          <Text fontSize="0.8rem" wordBreak="break-word" whiteSpace="pre-wrap">
            {channelOverviewSelector
              ? channelOverviewSelector.description
              : null}
          </Text>
        </VStack>
      </GridItem>
      <GridItem>
        <VStack>
          <Text fontWeight="bold">Tags</Text>
          <SimpleGrid minChildWidth="120px" w="100%">
            {formatChannelTags(channelOverviewSelector.tags).map((tag) => (
              <Box key={tag}>
                <Badge>{tag}</Badge>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </GridItem>
    </Grid>
  );
}
