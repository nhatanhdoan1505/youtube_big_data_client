import { PayloadAction } from "@reduxjs/toolkit";
import { userAction } from "@store/index";
import { call, put, takeLatest } from "redux-saga/effects";
import { IUserPayload } from ".";
import { userApi } from "@api/index";

function* updateUser(action: PayloadAction<IUserPayload>) {
  try {
    const { user } = action.payload;
    if (user) {
      yield call(userApi.updateUser, { user });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateUserProfile(action: PayloadAction<IUserPayload>) {
  try {
    const { channel, competitorChannel } = action.payload;
    const res = yield call(userApi.updateUserProfile, {
      channel,
      competitorChannel,
    });
    if (res) {
      const userProfile = yield call(userApi.getUserProfile, {});
      yield put(userAction.setUserProfile({ userProfile }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getUserProfile(action: PayloadAction<IUserPayload>) {
  try {
    const userProfile = yield call(userApi.getUserProfile, {});
    yield put(userAction.setUserProfile({ userProfile }));
  } catch (error) {
    console.log(error);
  }
}

export function* userSaga() {
  yield takeLatest(userAction.updateUser, updateUser);
  yield takeLatest(userAction.preUpdateUserProfile, updateUserProfile);
  yield takeLatest(userAction.preSetUserProfile, getUserProfile);
}
