import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import channelApi from "../../api/channelApi";
import { channelAction } from "../../features/channel/channelSlice";
import { IChannel, IPayload } from "../../models";

function* fetchChannelByLabel(action: PayloadAction<IPayload>) {
  try {
    const respone: IChannel[] = yield call(
      channelApi.getChannelByLabel,
      action.payload
    );
    yield put(channelAction.getByLabelSuccess(respone));
  } catch (error) {
    console.log(error);
    yield put(channelAction.getChannelFail());
  }
}

function* fetchChannelById(action: PayloadAction<IPayload>) {
  try {
    const respone: IChannel = yield call(
      channelApi.getChannelById,
      action.payload
    );
    yield put(channelAction.getByIdSuccess(respone));
  } catch (error) {
    console.log(error);
    yield put(channelAction.getChannelFail());
  }
}

function* getAllChannel() {
  try {
    const respone: IChannel[] = yield call(channelApi.getAllChannel);
    yield put(channelAction.getAllChannel(respone));
  } catch (error) {
    console.log(error);
  }
}

function* deleteChannel(action: PayloadAction<string>) {
  try {
    const respone: IChannel[] = yield call(
      channelApi.deleteChannel,
      action.payload
    );

    yield put(channelAction.deleteChannelSuccessfully(respone));
  } catch (error) {}
}

export default function* getByChannel() {
  yield takeLatest(channelAction.getByLabel, fetchChannelByLabel);
  yield takeLatest(channelAction.getById, fetchChannelById);
  yield takeLatest(channelAction.queryAllChannel, getAllChannel);
  yield takeLatest(channelAction.deleteChannel, deleteChannel);
}
