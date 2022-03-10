import axiosClient from "./axiosClient";


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
};

export default authApi;
