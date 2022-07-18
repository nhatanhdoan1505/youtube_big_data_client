import { videoApi } from "@api/index";
import { IVideoViewsStatistic } from "@models/index";
import * as randomColor from "randomcolor";
import { useEffect, useState } from "react";

export interface IVideoViewsStatisticForChart {
  views: string[];
  videoCount: number[];
  percentage: number[];
  color: string[];
  viewsGap: number[];
}

export const useVideoViewsStatistic = () => {
  const [videoViewsStatistic, setVideoViewsStatistic] =
    useState<IVideoViewsStatisticForChart>(null!);

  const optimizeVideoViewsStatistic = (
    videoViewsStatistic: IVideoViewsStatistic
  ): IVideoViewsStatisticForChart => {
    let views = Object.keys(videoViewsStatistic) as string[];
    let viewsGap = [...views].map((v) => +v);
    const videoCount = Object.values(videoViewsStatistic) as number[];
    let totalVideoCount = videoCount.reduce((a, b) => +a + +b, 0);
    let percentage = videoCount.map((v) => (+v * 100) / totalVideoCount);
    for (let i = 0; i < views.length; i++) {
      views[i] = `${
        +views[i] >= 1000000000
          ? `~${(+views[i] / 1000000000).toFixed(1)}B`
          : +views[i] >= 1000000
          ? `~${(+views[i] / 1000000).toFixed(1)}M`
          : +views[i] >= 1000
          ? `~${(+views[i] / 1000).toFixed(1)}K`
          : `~${+views[i]}`
      } Views (${percentage[i].toFixed(2)}%)`;
    }
    let color = views.map(() =>
      randomColor({ luminosity: "bright", format: "rgb" })
    );
    return { videoCount, percentage, color, views, viewsGap };
  };

  useEffect(() => {
    const getVideoViewsStatistic = async () => {
      const res = await videoApi.getVideoViewsStatistic();
      setVideoViewsStatistic(optimizeVideoViewsStatistic(res));
    };

    getVideoViewsStatistic();
  }, []);

  return { videoViewsStatistic };
};
