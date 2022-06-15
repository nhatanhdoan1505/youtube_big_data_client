import {
  IChannel,
  IChannelOverviewResponse,
  IChannelSubscriberAverageResponse,
  IChannelSubscriberStatistic,
  IChannelSubscriberStatisticResponse,
  IChannelTagsResponse,
  IChannelUploadStatisticResponse,
  IResponse,
  ISortChannel,
  ISortDataPayload,
  ISortVideo,
  ISortVideoResponse,
  ITotal,
  IVideoListOverviewResponse,
  IChannelLabelResponse,
  IVideoViewsDistributionResponse,
} from "@models/index";
import { AxiosResponse } from "axios";
import { ISortChannelResponse } from "./../models/youtube";
import axiosClient from "./axiosClient";

interface IPayload {
  label?: string;
  id?: string;
  token?: string;
}

export const channelApi = {
  async getChannelByLabel(payLoad: IPayload): Promise<IChannel[]> {
    const url = "/channel/label";
    const res = await axiosClient.post(url, { label: payLoad.label });
    return res.data.data;
  },

  async getChannelById(id: string): Promise<IChannel> {
    const url = "/channel/id";
    const res = await axiosClient.post(url, { id });
    return res.data.data;
  },

  async getAllChannel() {
    const url = "/channels";
    const res = await axiosClient.get(url);
    return res.data.data;
  },

  async deleteChannel(id: string): Promise<IChannel[]> {
    const url = `/channel/${id}`;
    const res = await axiosClient.delete(url);
    return res.data.data;
  },

  async getSortChannel({
    pageNumber,
    type,
  }: ISortDataPayload): Promise<ISortChannel[]> {
    const url = `/channel/sort/${pageNumber}`;
    const res: AxiosResponse<IResponse<ISortChannelResponse>> =
      await axiosClient.post(url, { type });
    return res.data.data.channelList;
  },

  async getTotalSortChannels(): Promise<ITotal> {
    const url = `/channel/sort/total`;
    const res: AxiosResponse<IResponse<ITotal>> = await axiosClient.get(url);
    return res.data.data;
  },

  async getChannelOverview({
    id,
  }: {
    id: string;
  }): Promise<IChannelOverviewResponse> {
    try {
      const response: AxiosResponse<IResponse<IChannelOverviewResponse>> =
        await axiosClient.get(`/channel/overview/${id}`);
      return response.data.data;
    } catch (error) {
      return { isExist: false };
    }
  },

  async getChannelTags({ id }: { id: string }): Promise<IChannelTagsResponse> {
    try {
      const response: AxiosResponse<IResponse<IChannelTagsResponse>> =
        await axiosClient.get(`/channel/tagsList/${id}`);
      return response.data.data;
    } catch (error) {
      return { tagsList: [] };
    }
  },

  async getVideoListOverview({
    id,
    limit,
  }: {
    id: string;
    limit: number;
  }): Promise<IVideoListOverviewResponse> {
    try {
      const url = `/channel/videoList/${id}/${limit}`;
      const res: AxiosResponse<IResponse<IVideoListOverviewResponse>> =
        await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      return null!;
    }
  },

  async getVideoViewsDistribution({
    id,
  }: {
    id: string;
  }): Promise<IVideoViewsDistributionResponse> {
    try {
      const url = `/channel/videoViewsDistribution/${id}`;
      const res: AxiosResponse<IResponse<IVideoViewsDistributionResponse>> =
        await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      return null!;
    }
  },

  async getVideoList({
    id,
    pageNumber,
    type,
  }: ISortDataPayload): Promise<ISortVideo[]> {
    try {
      const url = `/channel/videoList/${id}/${pageNumber}`;
      const res: AxiosResponse<IResponse<ISortVideoResponse>> =
        await axiosClient.post(url, { type });
      return res.data.data.videoList!;
    } catch (error) {
      return [];
    }
  },

  async getTotalVideo({ id }: ISortDataPayload): Promise<ITotal> {
    try {
      const url = `/channel/videos/total/${id}`;
      const res: AxiosResponse<IResponse<ITotal>> = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      return {} as ITotal;
    }
  },

  async getVideoDeleted({ id }: ISortDataPayload): Promise<ISortVideo[]> {
    try {
      const url = `/channel/videoDeleted/${id}`;
      const res: AxiosResponse<IResponse<ISortVideoResponse>> =
        await axiosClient.get(url);
      return res.data.data.videoList!;
    } catch (error) {
      return [];
    }
  },

  async getChannelUpload(): Promise<IChannelUploadStatisticResponse> {
    const url = `/channel/upload/statistic`;
    const res: AxiosResponse<IResponse<IChannelUploadStatisticResponse>> =
      await axiosClient.get(url);
    return res.data.data;
  },

  async getChannelByUpload({
    subscribersGap,
    uploadGap,
  }: ISortDataPayload): Promise<ISortChannel[]> {
    const url = `/channel/upload/sort`;
    const res: AxiosResponse<IResponse<ISortChannelResponse>> =
      await axiosClient.post(url, { subscribersGap, uploadGap });
    return res.data.data.channelList;
  },

  async getChannelSubscriberStatistic(): Promise<IChannelSubscriberStatistic> {
    const url = `/channel/subscriber/statistic`;
    const res: AxiosResponse<IResponse<IChannelSubscriberStatisticResponse>> =
      await axiosClient.get(url);

    return res.data.data.channelSubscriber!;
  },

  async getChannelSubscriberAverage(): Promise<number> {
    const url = `/channel/averageSubscriber`;
    const res: AxiosResponse<IResponse<IChannelSubscriberAverageResponse>> =
      await axiosClient.get(url);

    return res.data.data.averageChannelSubscriber!;
  },

  async getChannelBySubscriber({
    subscribeScope,
  }: ISortDataPayload): Promise<ISortChannel[]> {
    const url = `/channel/subscriber/sort`;
    const res: AxiosResponse<IResponse<ISortChannelResponse>> =
      await axiosClient.post(url, { subscribeScope });
    return res.data.data.channelList!;
  },

  async getChannelLabel(): Promise<string[]> {
    const url = `/channel/label/`;
    const res: AxiosResponse<IResponse<IChannelLabelResponse>> =
      await axiosClient.get(url);
    return res.data.data.labelList!;
  },
};
