import axiosClient from "./axiosClient";
import { IClawForm } from "../models/";

const serviceApi = {
  async requestClaw(body: IClawForm) {
    const url = "/service/getChannel";
    const res = await axiosClient.post(url, body);
    return res.data.data;
  },
  async getApiKey() {
    const url = "/service/key";
    const res = await axiosClient.get(url);
    return res.data.data;
  },
  async updateApiKey(apiKey: string) {
    const url = "/service/key";
    const res = await axiosClient.put(url, { key: apiKey });
    return res.data.data;
  },
};

export default serviceApi;
