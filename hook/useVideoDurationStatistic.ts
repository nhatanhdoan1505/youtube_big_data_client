import { videoApi } from "@api/index";
import { IVideoDurationStatisticResponse } from "@models/index";
import { formatDuration } from "@utils/index";
import { useEffect, useState } from "react";

export interface IVideoDurationStatisticForChart {
  duration: string[];
  videoCount: number[];
  recommended: string;
  recommendedDuration: number;
  averageViewsRecommendedDuration: number;
}

export const useVideoDurationStatistic = () => {
  const [videoDurationStatistic, setVideoDurationStatistic] =
    useState<IVideoDurationStatisticForChart>(null!);

  const optimizeVideoDurationStatistic = ({
    videoDurationStatistics,
    recommendedDuration,
    averageViewsRecommendedDuration,
  }: IVideoDurationStatisticResponse): IVideoDurationStatisticForChart => {
    let duration = Object.keys(videoDurationStatistics);
    const videoCount = Object.values(videoDurationStatistics);
    let recommended: string = `${formatDuration(
      +recommendedDuration
    )} ~ ${formatDuration(+recommendedDuration + 9)}`;
    duration = duration.map((d) => formatDuration(+d));

    return {
      videoCount,
      duration,
      recommended,
      recommendedDuration: +recommendedDuration,
      averageViewsRecommendedDuration: +averageViewsRecommendedDuration,
    };
  };

  useEffect(() => {
    const getVideoDurationStatistic = async () => {
      const res = await videoApi.getVideoDurationStatistic();
      setVideoDurationStatistic(optimizeVideoDurationStatistic(res));
    };

    getVideoDurationStatistic();
  }, []);

  return { videoDurationStatistic };
};
