import { IResponse, IUserProfile, IUserProfileResponse } from "@models/index";
import { IUser } from "@models/index";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosClient from "./axiosClient";

export const userApi = {
  async updateUser({ user }: { user: IUser }): Promise<boolean> {
    try {
      const url = "/user";
      await axiosClient.post(url, { user });
      return true;
    } catch (error) {
      return false;
    }
  },

  async getUserProfile({
    config,
  }: {
    config?: AxiosRequestConfig;
  }): Promise<IUserProfile> {
    try {
      const url = "/user/profile";
      const userData: AxiosResponse<IResponse<IUserProfileResponse>> =
        await axiosClient.get(url, config);
      return userData.data.data.userData;
    } catch (error) {
      return null!;
    }
  },

  async updateUserProfile({
    channel,
    competitorChannel,
    config,
  }: {
    channel: string;
    competitorChannel: string[];
    config?: AxiosRequestConfig;
  }): Promise<boolean> {
    try {
      const url = "/user/profile";
      const res = await axiosClient.post(
        url,
        { channel, competitorChannel },
        config
      );
      return true;
    } catch (error) {
      return false;
    }
  },
};
