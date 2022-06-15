import { channelApi, videoApi } from "@api/index";
import {
  ISortChannel,
  ISortDataPayload,
  ISortVideo,
  IVideoTagsAndKeywordSort,
} from "@models/index";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { youtubeAction, ISortYoutubePayload } from ".";

function* getVideoSortList(action: PayloadAction<ISortYoutubePayload>) {
  const {
    type,
    pageNumber,
    allVideoSortType,
    id,
    duration,
    viewScope,
    numberTags,
  } = action.payload;
  try {
    if (action.payload.id) {
      if (action.payload.type === "allVideo") {
        const videoList: ISortVideo[] = yield call(channelApi.getVideoList, {
          pageNumber,
          id,
          type: allVideoSortType === "popular" ? "views" : allVideoSortType,
        } as ISortDataPayload);
        yield put(
          youtubeAction.setVideoSortList({ videoList, ...action.payload })
        );

        return;
      }
      const videoList: ISortVideo[] = yield call(channelApi.getVideoList, {
        id,
        pageNumber,
        type: "gapViews",
      } as ISortDataPayload);
      yield put(
        youtubeAction.setVideoSortList({ videoList, ...action.payload })
      );

      return;
    }
    if (type === "videoDuration") {
      const videoList: ISortVideo[] = yield call(
        videoApi.getVideoSortByDuration,
        {
          duration,
        } as ISortDataPayload
      );
      yield put(
        youtubeAction.setVideoSortList({ videoList, ...action.payload })
      );
      yield put(youtubeAction.setPagination({ pageNumber: 1, totalPage: 1 }));

      return;
    }
    if (type === "videoView") {
      const videoList: ISortVideo[] = yield call(videoApi.getVideoByViews, {
        viewScope,
      });

      yield put(
        youtubeAction.setVideoSortList({ videoList, ...action.payload })
      );
      yield put(youtubeAction.setPagination({ pageNumber: 1, totalPage: 1 }));

      return;
    }

    if (type === "tagsTrend") {
      const videoList: ISortVideo[] = yield call(
        videoApi.getVideoByNumberTags,
        {
          numberTags,
        }
      );

      yield put(
        youtubeAction.setVideoSortList({ videoList, ...action.payload })
      );
      yield put(youtubeAction.setPagination({ pageNumber: 1, totalPage: 1 }));

      return;
    }

    const videoList: ISortVideo[] = yield call(videoApi.getSortVideo, {
      type,
      pageNumber,
    } as ISortDataPayload);
    yield put(youtubeAction.setVideoSortList({ videoList, ...action.payload }));
  } catch (error) {
    console.log(error);
  }
}

function* getChannelSortList(action: PayloadAction<ISortYoutubePayload>) {
  const {
    type,
    pageNumber,
    allVideoSortType,
    id,
    averageUploadScope,
    averageSubscriberScope,
    subscribeScope,
  } = action.payload;
  try {
    if (type === "upload") {
      const channelList: ISortChannel[] = yield call(
        channelApi.getChannelByUpload,
        {
          subscribersGap: averageSubscriberScope,
          uploadGap: averageUploadScope,
        }
      );

      yield put(
        youtubeAction.setChannelSortList({ channelList, ...action.payload })
      );

      return;
    }
    if (type === "channelSubscriber") {
      const channelList: ISortChannel[] = yield call(
        channelApi.getChannelBySubscriber,
        { subscribeScope }
      );

      yield put(
        youtubeAction.setChannelSortList({ channelList, ...action.payload })
      );

      return;
    }
    const channelList: ISortChannel[] = yield call(channelApi.getSortChannel, {
      type,
      pageNumber,
    } as ISortDataPayload);
    yield put(
      youtubeAction.setChannelSortList({ channelList, ...action.payload })
    );
  } catch (error) {
    console.log(error);
  }
}

function* getVideoDeleted(action: PayloadAction<ISortYoutubePayload>) {
  const { id } = action.payload;
  try {
    const videoDeleted: ISortVideo[] = yield call(channelApi.getVideoDeleted, {
      id,
    } as ISortDataPayload);
    yield put(
      youtubeAction.setVideoDeleted({ videoDeleted, ...action.payload })
    );
  } catch (error) {
    console.log(error);
  }
}

function* getHashtagAndKeyword(action: PayloadAction<ISortYoutubePayload>) {
  const { type } = action.payload;
  try {
    if (type === "hashtag") {
      const videoTags: IVideoTagsAndKeywordSort[] = yield call(
        videoApi.getVideoTagsSort
      );
      yield put(
        youtubeAction.setHashtagAndKeyword({ hashtagAndKeyword: videoTags })
      );

      return;
    }
    const videoKeywords: IVideoTagsAndKeywordSort[] = yield call(
      videoApi.getVideoKeywordsSort
    );
    yield put(
      youtubeAction.setHashtagAndKeyword({ hashtagAndKeyword: videoKeywords })
    );
  } catch (error) {
    console.log(error);
  }
}

function* getVideoListByTagAndKeyword(
  action: PayloadAction<ISortYoutubePayload>
) {
  try {
    const { tag, pageNumber, keyword } = action.payload;
    let videoList: ISortVideo[] = [];
    if (tag) {
      videoList = yield call(videoApi.getVideoByTag, {
        tag,
        pageNumber,
      });

      yield put(
        youtubeAction.setVideoSortList({ videoList, ...action.payload })
      );
      return;
    }
    videoList = yield call(videoApi.getVideoByKeyword, {
      keyword,
      pageNumber,
    });
    yield put(youtubeAction.setVideoSortList({ videoList, ...action.payload }));
  } catch (error) {
    console.log(error);
  }
}

export function* youtubeSaga() {
  yield takeLatest(youtubeAction.preSetVideoSortList, getVideoSortList);
  yield takeLatest(youtubeAction.preSetChannelSortList, getChannelSortList);
  yield takeLatest(youtubeAction.preSetVideoDeleted, getVideoDeleted);
  yield takeLatest(youtubeAction.preSetHashtagAndKeyword, getHashtagAndKeyword);
  yield takeLatest(
    youtubeAction.preSetVideoListByTag,
    getVideoListByTagAndKeyword
  );
}
