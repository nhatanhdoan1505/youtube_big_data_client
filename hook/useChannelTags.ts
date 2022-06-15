import { channelApi } from "@api/index";
import { useAppSelector } from "@app/index";
import { IChannelTagsResponse } from "@models/index";
import { selectChannelOverview } from "@store/index";
import { useEffect, useState } from "react";

interface IChannelTagsForChart {
  tagsNumber: number[];
  tagsCount: number[];
  average: number;
}

export const useChannelTags = () => {
  const [channelTagList, setChannelTagList] = useState<IChannelTagsForChart>(
    null!
  );

  const channelOverviewSelector = useAppSelector(selectChannelOverview);

  const optimizeChannelTagList = (channelTagList: IChannelTagsResponse) => {
    const tagsList = channelTagList.tagsList.map((c) => c.tags);
    let tagsNumber = Array.from(new Set(tagsList)).sort((a, b) => a - b);
    let tagsCount = tagsNumber.map(
      (t) => tagsList.filter((c) => c === t).length
    );
    let average = Math.trunc(
      tagsCount.reduce((a, b) => a + b, 0) / tagsCount.length
    );
    return { tagsNumber, tagsCount, average };
  };

  useEffect(() => {
    if (channelOverviewSelector) {
      const getChannelTags = async () => {
        const res = await channelApi.getChannelTags({
          id: channelOverviewSelector.id,
        });
        setChannelTagList(optimizeChannelTagList(res));
      };
      getChannelTags();
    }
  }, [channelOverviewSelector]);

  return { channelTagList };
};
