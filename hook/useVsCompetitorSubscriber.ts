import { IUserProfile } from "@models/user";
import { optimizeChannelCompetitor } from "@utils/index";
import { useEffect, useState } from "react";

export interface IVsCompetitorSubscriberChart {
  data: number[][];
  yLabel: string[];
  xLabel: string[];
}

export const useVsCompetitorSubscriber = ({
  channel,
  competitorChannel,
}: IUserProfile) => {
  const [vsCompetitorSubscriber, setVsCompetitorSubscriber] =
    useState<IVsCompetitorSubscriberChart>(null!);

  useEffect(() => {
    const viewList = [
      channel.subscribesHistory,
      ...competitorChannel.map((c) => c.subscribesHistory),
    ];
    const dateData = [channel.date, ...competitorChannel.map((c) => c.date)];
    const yLabel = [
      `My Channel - ${channel.title}`,
      ...competitorChannel.map((c) => c.title),
    ];
    const { data, date } = optimizeChannelCompetitor({
      viewList,
      date: dateData,
    });
    setVsCompetitorSubscriber({
      data,
      xLabel: date,
      yLabel,
    });
  }, []);

  return { vsCompetitorSubscriber };
};
