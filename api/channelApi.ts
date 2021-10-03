import { IChannel } from "../models";
import axiosClient from "./axiosClient";

interface IPayload {
  label?: string;
  id?: string;
  token?: string;
}

const channelApi = {
  async getChannelByLabel(payLoad: IPayload): Promise<IChannel[]> {
    const url = "/channel/label";
    const res = await axiosClient.post(url, { label: payLoad.label });
    return res.data.data;
  },
  async getChannelById(payLoad: IPayload): Promise<IChannel> {
    const url = "/channel/id";
    const res = await axiosClient.post(url, { id: payLoad.id });
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
};

export default channelApi;
