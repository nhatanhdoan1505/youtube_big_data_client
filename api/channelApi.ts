import {
  IChannel,
  ISortChannel,
  ISortChannelResponse,
  IResponse,
  ITotal,
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
    page,
    type,
  }: {
    page: number;
    type: "gapSubscribes" | "subscribe" | "views" | "gapViews";
  }): Promise<ISortChannel[]> {
    const url = `/channel/sort/${page}`;
    const res: AxiosResponse<IResponse<ISortChannelResponse>> =
      await axiosClient.post(url, { type });
    return res.data.data.channelList;
  },

  async getTotalSortChannels() {
    const url = `/channel/sort/total`;
    const res: AxiosResponse<IResponse<ITotal>> = await axiosClient.get(url);
    return res.data.data;
  },
};
