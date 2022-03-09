import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IChannel, IClawForm, ILoginForm } from "../../models";

const initialState: {
  loading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  channels: IChannel[];
  apiKey: string[];
  updateLoading: boolean;
} = {
  loading: false,
  isSuccess: false,
  isFail: false,
  channels: [],
  apiKey: [],
  updateLoading: false,
};

const serviceSlice = createSlice({
  name: "service",
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
    updateApiKey(state, action: PayloadAction<string>) {
      state.updateLoading = true;
    },
    getApiKey(state) {},
    getApiKeySuccessfully(state, action: PayloadAction<string[]>) {
      state.apiKey = action.payload;
      state.loading = false;
      state.updateLoading = false;
    },
  },
});

export const serviceAction = serviceSlice.actions;

export const selectLoading = (state: RootState) => state.service.loading;
export const selectIsSuccess = (state: RootState) => state.service.isSuccess;
export const selectIsFail = (state: RootState) => state.service.isFail;
export const selectChannelsResult = (state: RootState) =>
  state.service.channels;
export const selectApiKey = (state: RootState) => state.service.apiKey;
export const selectUpdateLoading = (state: RootState) =>
  state.service.updateLoading;

const serviceReducer = serviceSlice.reducer;
export default serviceReducer;
