import { IResponse, ISystemStat } from "@models/index";
import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";

export const systemApi = {
  async getSystemStat(): Promise<ISystemStat> {
    const url = "/system";
    const res: AxiosResponse<IResponse<ISystemStat>> = await axiosClient.get(
      url
    );

    return res.data.data;
  },
};
