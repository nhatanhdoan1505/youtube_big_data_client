import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";
import serviceApi from "../../api/service";
import { IClawForm } from "../../models";
import { serviceAction } from "./serviceSlice";
import { IChannel, IClawRes } from "../../models/channel";

function* requestClawChannel(action: PayloadAction<IClawForm>) {
  try {
    const respone: IChannel[] = yield serviceApi.requestClaw(action.payload);
    yield put(serviceAction.success(respone));
  } catch (error) {
    console.log(error);
    yield put(serviceAction.fail());
  }
}

function* getApiKey() {
  try {
    const response: { apiKey: string[] } = yield serviceApi.getApiKey();
    yield put(serviceAction.getApiKeySuccessfully(response.apiKey));
  } catch (error) {
    console.log(error);
  }
}

function* updateApiKey(action: PayloadAction<string>) {
  try {
    const response: { apiKey: string[] } = yield serviceApi.updateApiKey(
      action.payload
    );
    console.log("aaaa", response);
    yield put(serviceAction.getApiKeySuccessfully(response.apiKey));
  } catch (error) {
    console.log(error);
  }
}

export default function* auth() {
  yield takeLatest(serviceAction.sendRequest, requestClawChannel);
  yield takeLatest(serviceAction.getApiKey, getApiKey);
  yield takeLatest(serviceAction.updateApiKey, updateApiKey);
}
