import { IUserProfile } from "@models/user";
import { optimizeChannelCompetitor } from "@utils/index";
import { useEffect, useState } from "react";

export interface IVsCompetitorViewsChart {
  data: number[][];
  yLabel: string[];
  xLabel: string[];
}

export const useVsCompetitorViews = ({
  channel,
  competitorChannel,
}: IUserProfile) => {
  const [vsCompetitorViews, setVsCompetitorViews] =
    useState<IVsCompetitorViewsChart>(null!);

  useEffect(() => {
    const viewList = [
      channel.viewsHistory,
      ...competitorChannel.map((c) => c.viewsHistory),
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
    setVsCompetitorViews({
      data,
      xLabel: date,
      yLabel,
    });
  }, []);

  return { vsCompetitorViews };
};
