import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IChannel, IClawForm, ILoginForm } from "../../models";

const initialState: {
  loading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  channels: IChannel[];
} = {
  loading: false,
  isSuccess: false,
  isFail: false,
  channels: [],
};

const serviceSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sendRequest(state, action: PayloadAction<IClawForm>) {
      state.loading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    success(state, action: PayloadAction<IChannel[]>) {
      state.isSuccess = true;
      state.loading = false;
      state.channels = action.payload;
    },
    fail(state) {
      state.isFail = true;
      state.loading = false;
    },
  },
});

export const serviceAction = serviceSlice.actions;

export const selectLoading = (state: RootState) => state.service.loading;
export const selectIsSuccess = (state: RootState) => state.service.isSuccess;
export const selectIsFail = (state: RootState) => state.service.isFail;
export const selectChannels = (state: RootState) => state.service.channels;

const serviceReducer = serviceSlice.reducer;
export default serviceReducer;
