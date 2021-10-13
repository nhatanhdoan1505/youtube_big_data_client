import { StackDivider, VStack } from "@chakra-ui/react";
import { IChannel } from "../../../models";
import { optimizeChannel } from "../../../utils/common";
import Channel from "./Channel";

function ChannelView(props: { channels: IChannel[] }) {
  const channelsOptimize = optimizeChannel(props.channels);
  return (
    <>
      <VStack
        mt={10}
        divider={<StackDivider borderColor="gray.200" />}
        align="stretch"
      >
        {channelsOptimize.map((c) => {
          return (
            <Channel
              key={c.id}
              id={c.id}
              title={c.title}
              channelThumnail={c.channelThumnail}
              views={c.views}
              subscribe={c.subscribe}
              numberVideos={c.numberVideos}
              gapNumberVideos={c.gapNumberVideos}
              gapSubcribe={c.gapSubcribe}
              gapViews={c.gapViews}
              urlChannel={c.urlChannel}
            />
          );
        })}
      </VStack>
    </>
  );
}

export default ChannelView;
