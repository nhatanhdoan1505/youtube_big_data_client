import { ISortChannel } from "@models/index";
import { User } from "firebase/auth";

export interface IUser {
  email?: string;
  name?: string;
  photoUrl?: string;
  uid?: string;
}

export type FirebaseUser = User;

export interface IUserProfileResponse {
  userData: IUserProfile;
}

export interface IUserProfile extends IUser {
  channel: ISortChannel;
  competitorChannel: ISortChannel[];
}
