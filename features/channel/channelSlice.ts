import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IChannel, IPayload, IVideo } from "../../models";
import { sortChannel, sortVideo } from "../../utils/common";

export interface IVideoInformation extends IVideo {
  gapViews: string;
}

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
  date: string[];
  videoChart: IVideo;
  videoChartId: string;
  videoList: IVideoInformation[];
} = {
  channels: [],
  channel: null!,
  loading: false,
  message: "",
  labels: [],
  sortBy: "views",
  isDescending: true,
  channelsInitialized: [],
  date: [],
  videoChart: null!,
  videoChartId: "",
  videoList: [],
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<string[]>) {
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
    getChannelById(state, action: PayloadAction<string>) {},
    getChannelByIdSuccess(state, action: PayloadAction<IChannel>) {
      state.loading = false;
      state.channel = action.payload;
    },
    getVideoChart(state, action: PayloadAction<IVideo>) {
      state.videoChart = action.payload;
      state.videoChartId = action.payload.id;
    },
    resetVideoChart(state, action: PayloadAction<null>) {
      state.videoChart = null!;
      state.videoChartId = "";
    },
    sortVideo(state, action: PayloadAction<"gapViews" | "views">) {
      state.isDescending =
        state.sortBy === action.payload ? !state.isDescending : true;
      state.sortBy = action.payload;
      state.videoList = sortVideo(
        state.channel.videoList,
        state.sortBy,
        state.isDescending
      );
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
export const selectVideoChart = (state: RootState) => state.channel.videoChart;
export const selectVideoChartId = (state: RootState) =>
  state.channel.videoChartId;
export const selectVideoList = (state: RootState) => state.channel.videoList;

const channelReducer = channelSlice.reducer;
export default channelReducer;
