import { ISortChannel, ISortVideo } from "@models/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/index";

interface ISortYoutubePayload {
  videoList?: ISortVideo[];
  pageNumber: number;
  totalPage?: number;
  type:
    | "views"
    | "likes"
    | "commentCount"
    | "gapSubscribes"
    | "subscribe"
    | "gapViews";
}

interface IInitState {
  videoList: ISortVideo[];
  channelList: ISortChannel[];
  totalPage: number;
  pageNumber: number;
  type:
    | "views"
    | "likes"
    | "commentCount"
    | "gapSubscribes"
    | "subscribe"
    | "gapViews";
  videoInformation: ISortVideo;
  isShowModal: boolean;
  loading: boolean;
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
};

const youtubeSlice = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    setPagination(state, action: PayloadAction<ISortYoutubePayload>) {
      state.pageNumber = +action.payload.pageNumber!;
      state.totalPage = +action.payload.totalPage!;
      state.type = action.payload.type!;
    },
    getVideoSortList(state, action: PayloadAction<ISortYoutubePayload>) {
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

export const youtubeReducer = youtubeSlice.reducer;
