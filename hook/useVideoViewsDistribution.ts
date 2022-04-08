import { channelApi, systemApi } from "@api/index";
import { ISystemStat } from "@models/index";
import { useEffect, useState } from "react";
import { useAppSelector } from "@app/index";
import { selectChannelOverview } from "@store/index";

export const useVideoViewsDistribution = () => {
  const channelOverviewSelector = useAppSelector(selectChannelOverview);
  const [videoCount, setVideoCount] = useState<number[]>([]);
  const [labelList, setLabelList] = useState<string[]>([]);
  useEffect(() => {
    if (channelOverviewSelector) {
      const getSystemStat = async () => {
        const { videoViewsDistribution } =
          await channelApi.getVideoViewsDistribution({
            id: channelOverviewSelector.id,
          });

        setLabelList(
          Object.keys(videoViewsDistribution).map((value) =>
            +value >= 1000000000
              ? `~${(+value / 1000000000).toFixed(1)}B`
              : +value >= 1000000
              ? `~${(+value / 1000000).toFixed(1)}M`
              : +value >= 1000
              ? `~${(+value / 1000).toFixed(1)}K`
              : `~${+value}`
          )
        );
        setVideoCount(Object.values(videoViewsDistribution).map((v) => +v));
      };

      getSystemStat();
    }
  }, [channelOverviewSelector]);

  return { videoCount, labelList };
};
