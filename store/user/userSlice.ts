import { RootState } from "@app/index";
import { FirebaseUser, IUser, IUserProfile } from "@models/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserPayload {
  user?: IUser;
  firebaseUser?: FirebaseUser;
  isUpdateUser?: boolean;
  userProfile?: IUserProfile;
  channel?: string;
  competitorChannel?: string[];
  userLoading?: boolean;
}

interface IInitState {
  firebaseUser: FirebaseUser;
  isUpdateUser: boolean;
  userProfile: IUserProfile;
  userLoading: boolean;
}

const initialState: IInitState = {
  firebaseUser: null!,
  isUpdateUser: false,
  userProfile: null!,
  userLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<IUserPayload>) {
      state.userLoading = action.payload.userLoading!;
    },
    setFirebaseUser(state, action: PayloadAction<IUserPayload>) {
      state.firebaseUser = action.payload.firebaseUser!;
    },
    setIsUpdateUser(state, action: PayloadAction<IUserPayload>) {
      state.isUpdateUser = action.payload.isUpdateUser!;
    },
    updateUser(state, action: PayloadAction<IUserPayload>) {},
    preSetUserProfile(state, action: PayloadAction<IUserPayload>) {},
    setUserProfile(state, action: PayloadAction<IUserPayload>) {
      state.userProfile = action.payload.userProfile!;
    },
    preUpdateUserProfile(state, action: PayloadAction<IUserPayload>) {
      state.userLoading = true;
    },
  },
});

export const userAction = userSlice.actions;

export const selectFirebaseUser = (state: RootState) => state.user.firebaseUser;
export const selectIsUpdateUser = (state: RootState) => state.user.isUpdateUser;
export const selectUserProfile = (state: RootState) => state.user.userProfile;
export const selectUserLoading = (state: RootState) => state.user.userLoading;

export const userReducer = userSlice.reducer;
