import { ISortVideoProps, videoApi } from "@api/index";
import { IHotVideo } from "@models/index";
import { useEffect, useState } from "react";

export const useSortVideo = ({ page, type }: ISortVideoProps) => {
  const [sortVideoList, setsortVideoList] = useState<IHotVideo[]>([]);

  useEffect(() => {
    const getHotVideoBase = async () => {
      const videoHotList = await videoApi.getSortVideo({
        page,
        type,
      });
      setsortVideoList(videoHotList);
    };
    getHotVideoBase();
  }, []);

  return { sortVideoList };
};
