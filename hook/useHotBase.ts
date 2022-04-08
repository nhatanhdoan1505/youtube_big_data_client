import { videoApi, channelApi } from "@api/index";
import { ISortVideo, ISortChannel } from "@models/index";
import { useEffect, useState } from "react";

export const useHotBase = () => {
  const [hotVideoBaseList, setHotVideoBaseList] = useState<ISortVideo[]>([]);
  const [hotChannelBaseList, setHotChannelBaseList] = useState<ISortChannel[]>(
    []
  );

  useEffect(() => {
    const getHotVideoBase = async () => {
      const videoHotList = await videoApi.getSortVideo({
        pageNumber: 1,
        type: "gapViews",
      });
      setHotVideoBaseList(videoHotList.slice(0, 6));
    };
    const getHotChannelBase = async () => {
      const channelHotList = await channelApi.getSortChannel({
        pageNumber: 1,
        type: "gapSubscribes",
      });
      setHotChannelBaseList(channelHotList.slice(0, 6));
    };
    getHotVideoBase();
    getHotChannelBase();
  }, []);

  return { hotVideoBaseList, hotChannelBaseList };
};
