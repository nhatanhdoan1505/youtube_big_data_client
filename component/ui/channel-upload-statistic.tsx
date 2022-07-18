import { useAppDispatch } from "@app/index";
import { Divider, HStack, Select, SimpleGrid, VStack } from "@chakra-ui/react";
import { useChannelUploadStatistic } from "@hook/index";
import { youtubeAction } from "@store/index";
import { beautyNumberDisplay } from "@utils/index";
import { useEffect, useState } from "react";
import { ChannelUploadStatisticChart, TableChannel } from ".";

export function ChannelUploadStatistic() {
  const SUBSCRIBER_SCOPE = [50000, 100000, 500000, 1000000, 3000000];
  const UPLOAD_SCOPE = [2, 4, 6, 8, 10, 11];
  const { channelUploadStatistic } = useChannelUploadStatistic();
  const [averageUploadScope, setAverageUploadScope] = useState<number[]>([2]);
  const [averageSubscriberScope, setAverageSubscriberScope] = useState<
    number[]
  >([50000]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (channelUploadStatistic) {
      dispatch(youtubeAction.setLoading({ loading: false }));
      return;
    }
    dispatch(youtubeAction.setLoading({ loading: true }));
  }, [channelUploadStatistic]);

  useEffect(() => {
    let subscriberScope =
      averageSubscriberScope[0] === 50000
        ? [100000, 500000]
        : averageSubscriberScope[0] === 3000001
        ? [3000000]
        : [
            SUBSCRIBER_SCOPE[
              SUBSCRIBER_SCOPE.indexOf(averageSubscriberScope[0]) - 1
            ],
            averageSubscriberScope[0],
          ];

    let uploadScope =
      averageUploadScope[0] === 2
        ? [0, 2]
        : averageUploadScope[0] === 11
        ? [11]
        : [
            UPLOAD_SCOPE[UPLOAD_SCOPE.indexOf(averageUploadScope[0]) - 1],
            averageUploadScope[0],
          ];

    dispatch(
      youtubeAction.preSetChannelSortList({
        averageUploadScope: uploadScope,
        averageSubscriberScope: subscriberScope,
        type: "upload",
      })
    );
  }, [averageUploadScope, averageSubscriberScope]);

  return channelUploadStatistic && channelUploadStatistic.length > 0 ? (
    <VStack>
      <SimpleGrid columns={3} spacing={10}>
        {channelUploadStatistic.map((c) => (
          <ChannelUploadStatisticChart {...c} key={c.videoCount[0]} />
        ))}
      </SimpleGrid>
      <Divider />
      <Divider />
      <>
        <VStack w="100%" mt={5}>
          <HStack>
            <Select
              placeholder={`${beautyNumberDisplay("50000")} Subscribers`}
              onChange={(e) => {
                if (+e.target.value === averageSubscriberScope[0]) return;
                setAverageSubscriberScope([+e.target.value]);
              }}
            >
              {SUBSCRIBER_SCOPE.map((v) => (
                <option value={v} key={v}>
                  {beautyNumberDisplay(v.toString())} Subscribers
                </option>
              ))}
              <option value={3000001}>Over 3,000,000 Subscribers</option>
            </Select>
            <Select
              placeholder={`~${averageUploadScope[0]}`}
              onChange={(e) => {
                if (+e.target.value === averageSubscriberScope[0]) return;
                setAverageSubscriberScope([+e.target.value]);
              }}
            >
              {UPLOAD_SCOPE.map((v, index) =>
                index === UPLOAD_SCOPE.length - 1 ? (
                  <option value={v} key={v}>
                    {10}~
                  </option>
                ) : (
                  <option value={v}>~{v}</option>
                )
              )}
            </Select>
          </HStack>
          <TableChannel />
        </VStack>
      </>
    </VStack>
  ) : null;
}
