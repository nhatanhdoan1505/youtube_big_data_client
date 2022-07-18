import { channelApi } from "@api/index";
import { useAppDispatch } from "@app/index";
import { Box, Divider, Select, Text, VStack } from "@chakra-ui/react";
import { useChannelSubscriberStatistic } from "@hook/index";
import { youtubeAction } from "@store/index";
import { beautyNumberDisplay } from "@utils/index";
import { useEffect, useState } from "react";
import { ChannelSubscriberStatisticChart } from ".";
import { TableChannel } from "./table-channel";

export function ChannelSubscriberStatistic() {
  const { channelSubscriberStatistic } = useChannelSubscriberStatistic();
  const [averageChannelSubscriber, setAverageChannelSubscriber] =
    useState<number>(null!);
  const [subscribeScope, setSubscribeScope] = useState<number[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (channelSubscriberStatistic) {
      dispatch(youtubeAction.setLoading({ loading: false }));
      return;
    }
    dispatch(youtubeAction.setLoading({ loading: true }));
  }, [channelSubscriberStatistic]);

  useEffect(() => {
    const getChannelSubscriberAverage = async () => {
      const res = await channelApi.getChannelSubscriberAverage();
      setAverageChannelSubscriber(res);
    };
    getChannelSubscriberAverage();
  }, []);

  useEffect(() => {
    if (channelSubscriberStatistic && subscribeScope.length === 0) {
      setSubscribeScope([
        channelSubscriberStatistic.subscriberGap[0],
        channelSubscriberStatistic.subscriberGap[1],
      ]);
    }
  }, [channelSubscriberStatistic]);

  useEffect(() => {
    if (subscribeScope.length > 0) {
      dispatch(
        youtubeAction.preSetChannelSortList({
          type: "channelSubscriber",
          subscribeScope: subscribeScope,
        })
      );
    }
  }, [subscribeScope]);

  return channelSubscriberStatistic && averageChannelSubscriber ? (
    <VStack w="100%">
      <Text fontWeight="medium" my={5}>
        Average -{" "}
        <Text display="inline" color="red.400" fontWeight="light">
          {beautyNumberDisplay(averageChannelSubscriber.toString())}
        </Text>{" "}
        subscribers
      </Text>
      <Box maxWidth="600px" w="100%">
        <ChannelSubscriberStatisticChart
          channelSubscriberStatistic={channelSubscriberStatistic}
        />
      </Box>
      <Divider />
      <Divider />
      <VStack w="100%">
        {subscribeScope.length > 0 && (
          <VStack>
            <Text fontWeight="bold" mt={10}>
              Top Channel Has Subscribers{" "}
              {subscribeScope[0] ===
              channelSubscriberStatistic.subscriberGap[
                channelSubscriberStatistic.subscriberGap.length - 1
              ]
                ? "Larger"
                : "Average"}{" "}
              of{" "}
              <Text display="inline" color="red.400">
                {subscribeScope[0] === 50000001
                  ? "5,000,000"
                  : beautyNumberDisplay(subscribeScope[0].toString())}
                {subscribeScope[1]
                  ? ` ~ ${beautyNumberDisplay(subscribeScope[1].toString())}`
                  : null}
              </Text>{" "}
            </Text>
            <Select
              placeholder={`${beautyNumberDisplay(
                subscribeScope[0].toString()
              )} subscribers`}
              onChange={(e) => {
                if (+e.target.value === subscribeScope[0]) return;
                if (
                  +e.target.value ===
                  channelSubscriberStatistic.subscriberGap[
                    channelSubscriberStatistic.subscriberGap.length - 1
                  ]
                ) {
                  setSubscribeScope([+e.target.value]);
                  return;
                }
                setSubscribeScope([
                  +e.target.value,
                  channelSubscriberStatistic.subscriberGap[
                    channelSubscriberStatistic.subscriberGap.indexOf(
                      +e.target.value
                    ) + 1
                  ],
                ]);
              }}
            >
              {channelSubscriberStatistic.subscriberGap.map((v) => (
                <option value={v} key={v}>
                  {v === 50000001
                    ? "Over 5,000,000"
                    : beautyNumberDisplay(v.toString())}{" "}
                  Subscribers
                </option>
              ))}
            </Select>
          </VStack>
        )}
        <TableChannel />
      </VStack>
    </VStack>
  ) : null;
}
