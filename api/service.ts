import axiosClient from "./axiosClient";
import { IClawForm } from "../models/";

const serviceApi = {
  async requestClaw(body: IClawForm) {
    const url = "/service/getChannel";
    const res = await axiosClient.post(url, body);
    return res.data.data;
  },
};

export default serviceApi;
