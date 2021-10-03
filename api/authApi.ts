import { ILoginForm } from "../models/";
import axiosClient from "./axiosClient";
import { LoginRes } from "../models/";

interface IPayload {
  token?: string;
}

const authApi = {
  async checkIsAdmin(payLoad: IPayload): Promise<{ isAdmin: boolean }> {
    const url = "/auth/isAdmin";
    const res = await axiosClient.post(url, {
      token: payLoad.token ? payLoad.token : "",
    });
    return res.data.data;
  },

  async login(payLoad: ILoginForm): Promise<LoginRes> {
    const url = "/auth/sign_in";
    const res = await axiosClient.post(url, payLoad);
    const data: LoginRes = res.data;
    return data;
  },
};

export default authApi;
