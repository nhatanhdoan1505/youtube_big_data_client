import {
  ISortDataPayload,
  IVideoDurationStatistic,
  IVideoDurationStatisticResponse,
  IVideoTagsAndKeywordSort,
  IVideoTagsSortResponse,
  IVideoTagsStatisticResponse,
  IVideoViewAverageResponse,
  IVideoViewsStatistic,
  IVideoViewsStatisticResponse,
} from "@models/index";
import axiosClient from "./axiosClient";
import { ISortVideoResponse, ISortVideo, ITotal } from "@models/index";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import { IResponse } from "@models/index";

export const videoApi = {
  async getSortVideo({
    pageNumber,
    type,
  }: ISortDataPayload): Promise<ISortVideo[]> {
    const url = `/video/sort/${pageNumber}`;
    const res: AxiosResponse<IResponse<ISortVideoResponse>> =
      await axiosClient.post(url, { type });
    return res.data.data.videoList!;
  },

  async getTotalSortVideos({ config }: { config?: AxiosRequestConfig }) {
    const url = `/video/sort/total`;
    const res: AxiosResponse<IResponse<ITotal>> = await axiosClient.get(
      url,
      config
    );
    return res.data.data;
  },

  async getVideoTagsSort(): Promise<IVideoTagsAndKeywordSort[]> {
    const url = `/videoTags/sort`;
    const res: AxiosResponse<IResponse<IVideoTagsSortResponse>> =
      await axiosClient.get(url);
    return res.data.data.tagsList;
  },

  async getVideoByTag({
    tag,
    pageNumber,
  }: ISortDataPayload): Promise<ISortVideo[]> {
    const url = `/video/hashtag/${pageNumber}`;
    const res: AxiosResponse<IResponse<ISortVideoResponse>> =
      await axiosClient.post(url, { tag });
    return res.data.data.videoList!;
  },

  async getTotalVideoByTag({ tag }: ISortDataPayload) {
    const url = `/video/hashtag/total`;
    const res: AxiosResponse<IResponse<ITotal>> = await axiosClient.post(url, {
      tag,
    });
    return res.data.data;
  },

  async getVideoKeywordsSort(): Promise<IVideoTagsAndKeywordSort[]> {
    const url = `/videoKeyword/sort`;
    const res: AxiosResponse<IResponse<IVideoTagsSortResponse>> =
      await axiosClient.get(url);
    return res.data.data.keywordList;
  },

  async getVideoByKeyword({
    keyword,
    pageNumber,
  }: ISortDataPayload): Promise<ISortVideo[]> {
    const url = `/video/keyword/${pageNumber}`;
    const res: AxiosResponse<IResponse<ISortVideoResponse>> =
      await axiosClient.post(url, { keyword });
    return res.data.data.videoList!;
  },

  async getTotalVideoByKeyword({ keyword }: ISortDataPayload) {
    const url = `/video/keyword/total`;
    const res: AxiosResponse<IResponse<ITotal>> = await axiosClient.post(url, {
      keyword,
    });
    return res.data.data;
  },

  async getVideoDurationStatistic(): Promise<IVideoDurationStatisticResponse> {
    const url = `/video/duration/statistic`;
    const res: AxiosResponse<IResponse<IVideoDurationStatisticResponse>> =
      await axiosClient.get(url);
    return res.data.data;
  },

  async getVideoSortByDuration({
    duration,
  }: ISortDataPayload): Promise<ISortVideo[]> {
    const url = `/video/duration/sort`;
    const res: AxiosResponse<IResponse<ISortVideoResponse>> =
      await axiosClient.post(url, { duration: duration?.toString() });

    return res.data.data.videoList!;
  },

  async getVideoViewsStatistic(): Promise<IVideoViewsStatistic> {
    const url = `/video/views/statistic`;
    const res: AxiosResponse<IResponse<IVideoViewsStatisticResponse>> =
      await axiosClient.get(url);

    return res.data.data.videoViews!;
  },

  async getVideoViewsAverage(): Promise<number> {
    const url = `/video/averageViews`;
    const res: AxiosResponse<IResponse<IVideoViewAverageResponse>> =
      await axiosClient.get(url);

    return res.data.data.averageVideoView!;
  },

  async getVideoByViews({
    viewScope,
  }: ISortDataPayload): Promise<ISortVideo[]> {
    const url = `/video/views/sort`;
    const res: AxiosResponse<IResponse<ISortVideoResponse>> =
      await axiosClient.post(url, { viewScope });
    return res.data.data.videoList!;
  },

  async getVideoTagsStatistic(): Promise<IVideoTagsStatisticResponse> {
    const url = `/video/tags/statistic`;
    const res: AxiosResponse<IResponse<IVideoTagsStatisticResponse>> =
      await axiosClient.get(url);
    return res.data.data;
  },

  async getVideoByNumberTags({
    numberTags,
  }: ISortDataPayload): Promise<ISortVideo[]> {
    const url = `/video/numberTags/sort`;
    const res: AxiosResponse<IResponse<ISortVideoResponse>> =
      await axiosClient.post(url, { numberTags });
    return res.data.data.videoList!;
  },
};
