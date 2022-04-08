import { ISortChannel, ISortVideo, IChannelOverview } from "@models/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/index";

interface ISortYoutubePayload {
  videoList?: ISortVideo[];
  channelList?: ISortChannel[];
  youtubeObject?: "video" | "channel" | "hashtag";
  pageNumber?: number;
  totalPage?: number;
  type?:
    | "views"
    | "likes"
    | "commentCount"
    | "gapViews"
    | "subscribe"
    | "numberVideos"
    | "gapSubscribes"
    | "gapNumberVideos"
    | "overview"
    | "topVideo"
    | "allVideo"
    | "dailyStat"
    | "history"
    | "videoHistory"
    | "about"
    | "oldest"
    | "newest";
  channelOverview?: IChannelOverview;
  videoListOverview?: ISortVideo[];
  videoViewsDistribution?: { label: string[]; videoCount: number[] };
  id?: string;
}

interface IInitState {
  videoList: ISortVideo[];
  channelList: ISortChannel[];
  totalPage: number;
  pageNumber: number;
  youtubeObject: "video" | "channel" | "hashtag";
  type:
    | "views"
    | "likes"
    | "commentCount"
    | "gapViews"
    | "subscribe"
    | "numberVideos"
    | "gapSubscribes"
    | "gapNumberVideos"
    | "overview"
    | "topVideo"
    | "allVideo"
    | "dailyStat"
    | "history"
    | "videoHistory"
    | "about"
    | "oldest"
    | "newest";
  videoInformation: ISortVideo;
  isShowModal: boolean;
  loading: boolean;
  channelOverview: IChannelOverview;
  videoListOverview: ISortVideo[];
  videoViewsDistribution: { label: string[]; videoCount: number[] };
}

const initialState: IInitState = {
  videoList: [],
  channelList: [],
  totalPage: 1,
  pageNumber: 1,
  loading: false,
  videoInformation: null!,
  isShowModal: false,
  type: "views",
  youtubeObject: null!,
  channelOverview: null!,
  videoListOverview: [],
  videoViewsDistribution: null!,
};

const youtubeSlice = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    setYoutubeObject(state, action: PayloadAction<ISortYoutubePayload>) {
      state.youtubeObject = action.payload.youtubeObject!;
    },
    setType(state, action: PayloadAction<ISortYoutubePayload>) {
      state.type = action.payload.type!;
    },
    setPagination(state, action: PayloadAction<ISortYoutubePayload>) {
      state.pageNumber = +action.payload.pageNumber!;
      state.totalPage = +action.payload.totalPage!;
      state.type = action.payload.type!;
    },
    preSetVideoSortList(state, action: PayloadAction<ISortYoutubePayload>) {
      state.loading = true;
    },
    setVideoSortList(state, action: PayloadAction<ISortYoutubePayload>) {
      state.videoList = action.payload.videoList!;
      state.loading = false;
    },
    setIsShowModal(state, action: PayloadAction<boolean>) {
      state.isShowModal = action.payload;
    },
    setVideoInformationModal(state, action: PayloadAction<ISortVideo>) {
      state.videoInformation = action.payload;
    },
    preSetChannelSortList(state, action: PayloadAction<ISortYoutubePayload>) {
      state.loading = true;
    },
    setChannelSortList(state, action: PayloadAction<ISortYoutubePayload>) {
      state.channelList = action.payload.channelList!;
      state.loading = false;
    },
    setChannelOverview(state, action: PayloadAction<ISortYoutubePayload>) {
      state.channelOverview = action.payload.channelOverview!;
    },
    preSetVideoListOverview(
      state,
      action: PayloadAction<ISortYoutubePayload>
    ) {},
    setVideoListOverview(state, action: PayloadAction<ISortYoutubePayload>) {
      state.videoListOverview = action.payload.videoListOverview!;
    },
  },
});

export const youtubeAction = youtubeSlice.actions;

export const selectPageNumber = (state: RootState) => state.youtube.pageNumber;
export const selectTotalPage = (state: RootState) => state.youtube.totalPage;
export const selectVideoList = (state: RootState) => state.youtube.videoList;
export const selectSortType = (state: RootState) => state.youtube.type;
export const selectVideoInformation = (state: RootState) =>
  state.youtube.videoInformation;
export const selectIsShowModal = (state: RootState) =>
  state.youtube.isShowModal;
export const selectLoading = (state: RootState) => state.youtube.loading;
export const selectChannelList = (state: RootState) =>
  state.youtube.channelList;
export const selectYoutubeObject = (state: RootState) =>
  state.youtube.youtubeObject;
export const selectChannelOverview = (state: RootState) =>
  state.youtube.channelOverview;
export const selectVideoListOverview = (state: RootState) =>
  state.youtube.videoListOverview;
export const selectVideoViewDistribution = (state: RootState) =>
  state.youtube.videoViewsDistribution;

export const youtubeReducer = youtubeSlice.reducer;
