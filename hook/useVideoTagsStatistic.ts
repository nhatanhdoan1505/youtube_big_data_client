import { videoApi } from "@api/index";
import { IVideoTagsStatisticResponse } from "@models/index";
import { useEffect, useState } from "react";

export interface IVideoTagsStatisticForChart {
  tags: string[];
  videoCount: number[];
  recommendedTags: number;
  averageViewsRecommendedTags: number;
}

export const useVideoTagsStatistic = () => {
  const [videoTagsStatistic, setVideoTagsStatistic] =
    useState<IVideoTagsStatisticForChart>(null!);

  const optimizeVideoTagsStatistic = ({
    videoTagsStatistics,
    recommendedTags,
    averageViewsRecommendedTags,
  }: IVideoTagsStatisticResponse): IVideoTagsStatisticForChart => {
    let tags = Object.keys(videoTagsStatistics);
    const videoCount = Object.values(videoTagsStatistics);
    return {
      videoCount,
      tags,
      recommendedTags: +recommendedTags,
      averageViewsRecommendedTags: +averageViewsRecommendedTags,
    };
  };

  useEffect(() => {
    const getVideoTagsStatistic = async () => {
      const res = await videoApi.getVideoTagsStatistic();
      setVideoTagsStatistic(optimizeVideoTagsStatistic(res));
    };

    getVideoTagsStatistic();
  }, []);

  return { videoTagsStatistic };
};
