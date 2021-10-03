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

export default function* auth() {
  yield takeLatest(serviceAction.sendRequest, requestClawChannel);
}
