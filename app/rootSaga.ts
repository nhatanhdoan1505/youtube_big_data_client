import { youtubeSaga } from "@store/index";
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([youtubeSaga()]);
}

export default rootSaga;
