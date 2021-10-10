import { VStack, StackDivider } from "@chakra-ui/react";
import * as _ from "lodash";
import { useAppSelector } from "../../../app/hook";
import { selectChannels } from "../channelSlice";
import Channel from "./Channel";
import { optimizeChannel } from "../../../utils/common";
import { IChannel } from "../../../models";

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
