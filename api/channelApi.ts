import {
  IChannel,
  IChannelOverviewResponse,
  IChannelTagsResponse,
  IResponse,
  ISortChannel,
  ISortChannelResponse,
  ISortDataPayload,
  ISortVideo,
  ISortVideoResponse,
  ITotal,
  IVideoListOverviewResponse,
  IVideoViewsDistributionResponse,
} from "@models/index";
import { AxiosResponse } from "axios";
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
};
