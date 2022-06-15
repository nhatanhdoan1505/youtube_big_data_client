import { youtubeSaga, userSaga } from "@store/index";
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([youtubeSaga(), userSaga()]);
}

export default rootSaga;
