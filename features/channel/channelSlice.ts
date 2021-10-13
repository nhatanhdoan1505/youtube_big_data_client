import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IChannel, IPayload } from "../../models";
import { sortChannel } from "../../utils/common";

const initialState: {
  channels: IChannel[];
  channel: IChannel;
  loading: boolean;
  message: string;
  labels: string[];
  sortBy:
    | "gapNumberVideos"
    | "gapViews"
    | "gapSubcribe"
    | "subscribe"
    | "numberVideos"
    | "views";
  isDescending: boolean;
  channelsInitialized: IChannel[];
  date: string;
} = {
  channels: [],
  channel: null!,
  loading: false,
  message: "",
  labels: [],
  sortBy: "views",
  isDescending: true,
  channelsInitialized: [],
  date: "",
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    sortChannel(
      state,
      action: PayloadAction<
        | "gapNumberVideos"
        | "gapViews"
        | "gapSubcribe"
        | "subscribe"
        | "numberVideos"
        | "views"
      >
    ) {
      state.isDescending =
        state.sortBy === action.payload ? !state.isDescending : true;
      state.sortBy = action.payload;
      state.channels = sortChannel(
        state.channelsInitialized,
        state.sortBy,
        state.isDescending
      );
    },
    queryAllChannel(state) {},
    deleteChannel(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    deleteChannelSuccessfully(state, action: PayloadAction<IChannel[]>) {
      state.channels = action.payload;
      state.labels = state.channels.map((c) => c.label);
      state.loading = false;
    },
    getAllChannel(state, action: PayloadAction<IChannel[]>) {
      state.channelsInitialized = action.payload;
      state.labels = state.channelsInitialized.map((c) => c.label);
    },
    getByLabel(state, action: PayloadAction<IPayload>) {
      state.loading = true;
    },
    getByLabelSuccess(state, action: PayloadAction<IChannel[]>) {
      state.loading = false;
      state.channels = action.payload;
    },
    getChannelFail(state, action: PayloadAction) {
      state.loading = false;
    },
    getById(state, action: PayloadAction<IChannel>) {
      state.channel = action.payload;
    },
    getByIdSuccess(state, action: PayloadAction<IChannel>) {
      state.loading = false;
      state.channel = action.payload;
    },
  },
});

export const channelAction = channelSlice.actions;

export const selectChannels = (state: RootState) => state.channel.channels;
export const selectChannel = (state: RootState) => state.channel.channel;
export const selectLoading = (state: RootState) => state.channel.loading;
export const selectMessage = (state: RootState) => state.channel.message;
export const selectLabel = (state: RootState) => state.channel.labels;
export const selectSortBy = (state: RootState) => state.channel.sortBy;
export const selectIsDescending = (state: RootState) =>
  state.channel.isDescending;
export const selectDate = (state: RootState) => state.channel.date;

const channelReducer = channelSlice.reducer;
export default channelReducer;
