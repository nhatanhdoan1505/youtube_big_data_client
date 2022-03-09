import { videoApi } from "@api/index";
import { ISortVideo } from "./../../models/youtube";
import { ISortDataPayload } from "@models/index";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { youtubeAction } from ".";

function* getVideoSortList(action: PayloadAction<ISortDataPayload>) {
  try {
    const videoList: ISortVideo[] = yield call(
      videoApi.getSortVideo,
      action.payload
    );
    yield put(youtubeAction.setVideoSortList({ videoList, ...action.payload }));
  } catch (error) {
    console.log(error);
  }
}

export function* youtubeSaga() {
  yield takeLatest(youtubeAction.getVideoSortList, getVideoSortList);
}
