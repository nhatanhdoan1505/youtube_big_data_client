import { SimpleGrid, GridItem, Box } from "@chakra-ui/react";
import { HotChannelBase, HotVideoBase } from "@component/ui";
import { useHotBase } from "@hook/index";
import { HotElement } from ".";

export function HotTable() {
  const { hotVideoBaseList, hotChannelBaseList } = useHotBase();
  return (
    <SimpleGrid
      //   templateColumns="repeat(2, 1fr)"
      columns={2}
      border="1px solid #d8d8d8"
      my={3}
      py={3}
      px={2}
      borderRadius="8px"
      spacing={3}
      minChildWidth='500px'
    >
      <Box>
        <HotElement title="Hot Now Video" href="/topList/topVideo/gapViews/1">
          <HotVideoBase videoList={hotVideoBaseList} />
        </HotElement>
      </Box>
      <Box>
        <HotElement title="Hot Now Channel" href="/">
          <HotChannelBase channelList={hotChannelBaseList} />
        </HotElement>
      </Box>
    </SimpleGrid>
  );
}
