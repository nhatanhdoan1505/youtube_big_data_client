import {
  ISortChannel,
  ISortVideo,
  IChannelOverview,
  IVideoTagsAndKeywordSort,
} from "@models/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/index";

export interface ISortYoutubePayload {
  videoList?: ISortVideo[];
  videoDeleted?: ISortVideo[];
  channelList?: ISortChannel[];
  youtubeObject?: "video" | "channel" | "hashtag" | "statistic";
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
    | "newest"
    | "hashtag"
    | "keyword"
    | "videoDuration"
    | "videoView"
    | "tagsTrend"
    | "upload"
    | "channelSubscriber"
    | "totalView"
    | "thumbnail"
    | "myPageOverview"
    | "vsTrend"
    | "vsCompetitor"
    | "editProfile";
  channelOverview?: IChannelOverview;
  videoViewsDistribution?: { label: string[]; videoCount: number[] };
  id?: string;
  allVideoSortType?: "popular" | "oldest" | "newest";
  hashtagAndKeyword?: IVideoTagsAndKeywordSort[];
  searchHashtagAndKeyword?: IVideoTagsAndKeywordSort;
  isFirstSearchHashtagAndKeyword?: boolean;
  tag?: string;
  keyword?: string;
  duration?: number;
  viewScope?: number[];
  loading?: boolean;
  numberTags?: number;
  averageUploadScope?: number[];
  averageSubscriberScope?: number[];
  subscribeScope?: number[];
}

interface IInitState {
  videoList: ISortVideo[];
  videoDeleted: ISortVideo[];
  channelList: ISortChannel[];
  totalPage: number;
  pageNumber: number;
  youtubeObject: "video" | "channel" | "hashtag" | "statistic";
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
    | "newest"
    | "hashtag"
    | "keyword"
    | "videoDuration"
    | "videoView"
    | "tagsTrend"
    | "upload"
    | "channelSubscriber"
    | "totalView"
    | "thumbnail"
    | "myPageOverview"
    | "vsTrend"
    | "vsCompetitor"
    | "editProfile";
  videoInformation: ISortVideo;
  isShowModal: boolean;
  loading: boolean;
  channelOverview: IChannelOverview;
  videoViewsDistribution: { label: string[]; videoCount: number[] };
  allVideoSortType: "newest" | "oldest" | "popular";
  hashtagAndKeyword: IVideoTagsAndKeywordSort[];
  searchHashtagAndKeyword: IVideoTagsAndKeywordSort;
  isFirstSetSearchHashtagAndKeyword: boolean;
}

const initialState: IInitState = {
  videoList: [],
  videoDeleted: [],
  channelList: [],
  totalPage: 1,
  pageNumber: 1,
  loading: false,
  videoInformation: null!,
  isShowModal: false,
  type: null!,
  youtubeObject: null!,
  channelOverview: null!,
  videoViewsDistribution: null!,
  allVideoSortType: null!,
  hashtagAndKeyword: [],
  searchHashtagAndKeyword: null!,
  isFirstSetSearchHashtagAndKeyword: true,
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
    setLoading(state, action: PayloadAction<ISortYoutubePayload>) {
      state.loading = action.payload.loading!;
    },
    setPagination(state, action: PayloadAction<ISortYoutubePayload>) {
      state.pageNumber = +action.payload.pageNumber!;
      state.totalPage = +action.payload.totalPage!;
      state.type = action.payload.type ? action.payload.type : state.type;
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
    setAllVideoSortType(state, action: PayloadAction<ISortYoutubePayload>) {
      state.allVideoSortType = action.payload.allVideoSortType!;
      state.loading = false;
    },
    preSetVideoDeleted(state, action: PayloadAction<ISortYoutubePayload>) {
      state.loading = true;
    },
    setVideoDeleted(state, action: PayloadAction<ISortYoutubePayload>) {
      state.videoDeleted = action.payload.videoDeleted!;
      state.loading = false;
    },
    preSetHashtagAndKeyword(state, action: PayloadAction<ISortYoutubePayload>) {
      state.loading = true;
    },
    setHashtagAndKeyword(state, action: PayloadAction<ISortYoutubePayload>) {
      state.hashtagAndKeyword = action.payload.hashtagAndKeyword!;
      state.loading = false;
    },
    setSearchHashtagAndKeyword(
      state,
      action: PayloadAction<ISortYoutubePayload>
    ) {
      state.searchHashtagAndKeyword = action.payload.searchHashtagAndKeyword!;
    },
    setIsFirstSetSearchHashtagAndKeyword(
      state,
      action: PayloadAction<ISortYoutubePayload>
    ) {
      state.isFirstSetSearchHashtagAndKeyword =
        action.payload.isFirstSearchHashtagAndKeyword!;
    },
    preSetVideoListByTag(state, action: PayloadAction<ISortYoutubePayload>) {
      state.loading = true;
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
export const selectVideoViewDistribution = (state: RootState) =>
  state.youtube.videoViewsDistribution;
export const selectAllVideoSortType = (state: RootState) =>
  state.youtube.allVideoSortType;
export const selectVideoDeleted = (state: RootState) =>
  state.youtube.videoDeleted;
export const selectHashtagAndKeyword = (state: RootState) =>
  state.youtube.hashtagAndKeyword;
export const selectSearchHashtagAndKeyword = (state: RootState) =>
  state.youtube.searchHashtagAndKeyword;
export const selectIsFirstSetSearchHashtagAndKeyword = (state: RootState) =>
  state.youtube.isFirstSetSearchHashtagAndKeyword;

export const youtubeReducer = youtubeSlice.reducer;
