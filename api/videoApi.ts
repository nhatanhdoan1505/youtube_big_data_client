import { ISortDataPayload } from "@models/index";
import axiosClient from "./axiosClient";
import { ISortVideoResponse, ISortVideo, ITotal } from "@models/index";
import { AxiosResponse } from "axios";
import { IResponse } from "@models/index";

export const videoApi = {
  async getSortVideo({
    pageNumber,
    type,
  }: ISortDataPayload): Promise<ISortVideo[]> {
    const url = `/video/sort/${pageNumber}`;
    const res: AxiosResponse<IResponse<ISortVideoResponse>> =
      await axiosClient.post(url, { type });
    return res.data.data.videoList;
  },

  async getTotalSortVideos() {
    const url = `/channel/sort/total`;
    const res: AxiosResponse<IResponse<ITotal>> = await axiosClient.get(url);
    return res.data.data;
  },
};
