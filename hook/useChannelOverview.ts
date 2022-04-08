import { videoApi, channelApi } from "@api/index";
import { ISortVideo, ISortChannel } from "@models/index";
import { useEffect, useState } from "react";

interface IChannelOverview extends ISortChannel {
    
}

export const useChannelOverview = (channelData: ISortChannel) => {
  const [hotVideoBaseList, setHotVideoBaseList] = useState<ISortVideo[]>([]);
  const [hotChannelBaseList, setHotChannelBaseList] = useState<ISortChannel[]>(
    []
  );

  useEffect(() => {}, []);

  return { hotVideoBaseList, hotChannelBaseList };
};
