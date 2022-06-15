import { channelApi } from "@api/index";
import { IChannelUploadStatisticResponse } from "@models/index";
import { useEffect, useState } from "react";

export interface IChannelUploadStatisticForChart {
  subscribers: string;
  averageUpload: number;
  color: string[];
  videoCount: number[];
  averageUploadLabel: string[];
}

export const useChannelUploadStatistic = () => {
  const [channelUploadStatistic, setChannelUploadStatistic] = useState<
    IChannelUploadStatisticForChart[]
  >(null!);

  const optimizeVideoViewsStatistic = ({
    channelUploadStatistics,
    channelUploadAverage,
  }: IChannelUploadStatisticResponse): IChannelUploadStatisticForChart[] => {
    let channelUploadStatisticsList: IChannelUploadStatisticForChart[] = [];
    const subscriberList = Object.keys(channelUploadStatistics) as string[];
    let color = [
      "rgb(83, 22, 144)",
      "rgb(255, 73, 73)",
      "rgb(255, 141, 41)",
      "rgb(255, 205, 56)",
      "rgb(0, 110, 127)",
      "rgb(228, 174, 197)",
    ];
    for (let i in subscriberList) {
      let totalVideo = Object.values(channelUploadStatistics[subscriberList[i]])
        .map((c: any) => +c)
        .reduce((a, b) => a + b, 0);
      let videoCount = Object.values(
        channelUploadStatistics[subscriberList[i]]
      ).map((c: any) => +c);
      let averageUploadLabel = [
        "~2 v/week",
        "~4 v/week",
        "~6 v/week",
        "~8 v/week",
        "~10 v/week",
        "10~ v/week",
      ].map(
        (i, index) =>
          `${i} (${((+videoCount[index] * 100) / totalVideo).toFixed(1)}%)`
      );

      channelUploadStatisticsList.push({
        subscribers: subscriberList[i],
        averageUpload: +channelUploadAverage[subscriberList[i]],
        color,
        videoCount,
        averageUploadLabel,
      });
    }
    return channelUploadStatisticsList;
  };

  useEffect(() => {
    const getChannelUploadStatistic = async () => {
      const res = await channelApi.getChannelUpload();
      setChannelUploadStatistic(optimizeVideoViewsStatistic(res));
    };

    getChannelUploadStatistic();
  }, []);

  return { channelUploadStatistic };
};
