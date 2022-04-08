import { channelApi } from "@api/index";
import { useAppSelector } from "@app/index";
import { ISortVideo } from "@models/index";
import { selectChannelOverview } from "@store/index";
import { useEffect, useState } from "react";

export const useVideoHotListBase = () => {
  const [hotVideoBaseList, setHotVideoBaseList] = useState<ISortVideo[]>([]);
  const channelOverviewSelector = useAppSelector(selectChannelOverview);

  useEffect(() => {
    if (channelOverviewSelector) {
      const getHotVideoBase = async () => {
        const videoHotList = await channelApi.getVideoList({
          pageNumber: 1,
          type: "gapViews",
          id: channelOverviewSelector.id,
        });
        setHotVideoBaseList(videoHotList.slice(0, 10));
      };

      getHotVideoBase();
    }
  }, [channelOverviewSelector]);

  return { hotVideoBaseList };
};
