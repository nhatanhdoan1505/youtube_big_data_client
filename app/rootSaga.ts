import { all } from "redux-saga/effects";
import channelSaga from "../features/channel/channelSaga";
import authSaga from "../features/auth/authSaga";
import serviceSaga from "../features/service/serviceSaga";

export default function* rootSaga() {
  yield all([channelSaga(), authSaga(), serviceSaga()]);
}
