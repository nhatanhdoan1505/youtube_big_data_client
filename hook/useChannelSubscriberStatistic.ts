import { channelApi } from "./../api/channelApi";
import { videoApi } from "@api/index";
import * as randomColor from "randomcolor";
import { useEffect, useState } from "react";
import { IChannelSubscriberStatistic } from "./../models/youtube";

export interface IChannelSubscriberStatisticForChart {
  subscriber: string[];
  channelCount: number[];
  percentage: number[];
  color: string[];
  subscriberGap: number[];
}

export const useChannelSubscriberStatistic = () => {
  const [channelSubscriberStatistic, setChannelSubscriberStatistic] =
    useState<IChannelSubscriberStatisticForChart>(null!);

  const optimizeChannelSubscriberStatistic = (
    channelSubscriberStatistic: IChannelSubscriberStatistic
  ): IChannelSubscriberStatisticForChart => {
    let subscriber = Object.keys(channelSubscriberStatistic) as string[];
    let subscriberGap = [...subscriber].map((c) => +c);
    const channelCount = Object.values(channelSubscriberStatistic) as number[];
    let totalChannelCount = channelCount.reduce((a, b) => +a + +b, 0);
    let percentage = channelCount.map((v) => (+v * 100) / totalChannelCount);
    for (let i = 0; i < subscriber.length; i++) {
      subscriber[i] = `${
        +subscriber[i] >= 1000000000
          ? `~${(+subscriber[i] / 1000000000).toFixed(1)}B`
          : +subscriber[i] >= 1000000
          ? `~${(+subscriber[i] / 1000000).toFixed(1)}M`
          : +subscriber[i] >= 1000
          ? `~${(+subscriber[i] / 1000).toFixed(1)}K`
          : `~${+subscriber[i]}`
      } Subscribers (${percentage[i].toFixed(2)}%)`;
    }
    let color = subscriber.map((v) =>
      randomColor({ luminosity: "bright", format: "rgb" })
    );
    
    return { channelCount, percentage, color, subscriber, subscriberGap };
  };

  useEffect(() => {
    const getChannelSubscriberStatistic = async () => {
      const res = await channelApi.getChannelSubscriberStatistic();
      setChannelSubscriberStatistic(optimizeChannelSubscriberStatistic(res));
    };

    getChannelSubscriberStatistic();
  }, []);

  return { channelSubscriberStatistic };
};
