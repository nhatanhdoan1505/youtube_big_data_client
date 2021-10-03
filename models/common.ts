export interface IPayload {
  label?: string;
  channelId?: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface LoginRes {
  status: string;
  msg?: string;
  data: { token: string };
}

export interface IClawForm {
  url: string;
  label: string;
}


