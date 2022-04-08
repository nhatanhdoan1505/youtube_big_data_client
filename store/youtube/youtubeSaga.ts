import { channelApi, videoApi } from "@api/index";
import { ISortChannel, ISortDataPayload, ISortVideo } from "@models/index";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { youtubeAction } from ".";

function* getVideoSortList(action: PayloadAction<ISortDataPayload>) {
  try {
    const videoList: ISortVideo[] = [];
    if (action.payload.id) {
      const videoList: ISortVideo[] = yield call(
        channelApi.getVideoList,
        action.payload
      );
      yield put(
        youtubeAction.setVideoSortList({ videoList, ...action.payload })
      );
    } else {
      const videoList: ISortVideo[] = yield call(
        videoApi.getSortVideo,
        action.payload
      );
      yield put(
        youtubeAction.setVideoSortList({ videoList, ...action.payload })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* getChannelSortList(action: PayloadAction<ISortDataPayload>) {
  try {
    const channelList: ISortChannel[] = yield call(
      channelApi.getSortChannel,
      action.payload
    );
    yield put(
      youtubeAction.setChannelSortList({ channelList, ...action.payload })
    );
  } catch (error) {
    console.log(error);
  }
}

function* getVideoListOverview(action: PayloadAction<ISortDataPayload>) {
  try {
    if (
      ["oldest", "gapViews", "views", "newest"].includes(action.payload.type!)
    ) {
      const videoList: ISortVideo[] = yield call(
        channelApi.getVideoList,
        action.payload
      );
      yield put(
        youtubeAction.setVideoListOverview({ videoList, ...action.payload })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function* youtubeSaga() {
  yield takeLatest(youtubeAction.preSetVideoSortList, getVideoSortList);
  yield takeLatest(youtubeAction.preSetChannelSortList, getChannelSortList);
  yield takeLatest(youtubeAction.preSetVideoListOverview, getVideoListOverview);
}
