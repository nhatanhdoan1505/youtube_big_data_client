import { authAction } from "./authSlice";
import { call, put, takeLatest, take } from "redux-saga/effects";
import authApi from "../../api/authApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { ILoginForm, LoginRes } from "../../models";

function* fetchCheckIsAdmin() {
  try {
    const isAdmin: { isAdmin: boolean } = yield call(authApi.checkIsAdmin, {
      token: localStorage.getItem("access-token")!,
    });
    console.log(isAdmin);
    yield put(authAction.checkIsAdminSuccess(isAdmin));
  } catch (error) {
    console.log(error);
    yield put(authAction.checkIsAdminSuccess({ isAdmin: false }));
  }
}

function* login(action: PayloadAction<ILoginForm>) {
  try {
    const respone: LoginRes = yield call(authApi.login, action.payload);
    if (respone.status === "SUCCESS") {
      yield put(authAction.loginSuccessfully());
      yield localStorage.setItem("access-token", respone.data.token);

      const isAdmin: { isAdmin: boolean } = yield call(authApi.checkIsAdmin, {
        token: respone.data.token,
      });
      yield put(authAction.checkIsAdminSuccess(isAdmin));
    } else {
      yield put(authAction.loginFail());
    }
  } catch (error) {
    console.log(error);
    yield put(authAction.loginFail());
  }
}

export default function* auth() {
  yield takeLatest(authAction.checkIsAdmin, fetchCheckIsAdmin);
  yield takeLatest(authAction.login, login);
}
