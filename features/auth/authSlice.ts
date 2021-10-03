import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ILoginForm } from "../../models";

const initialState: {
  isAdmin: boolean;
  loading: boolean;
  isLoginSuccessfully: boolean;
  isLoginFail: boolean;
} = {
  isAdmin: false,
  loading: false,
  isLoginSuccessfully: false,
  isLoginFail: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkIsAdmin(state) {
      state.loading = true;
      state.isLoginSuccessfully = false;
      state.isLoginFail = false;
    },
    checkIsAdminSuccess(state, action: PayloadAction<{ isAdmin: boolean }>) {
      state.isAdmin = action.payload.isAdmin;
      state.isLoginSuccessfully = action.payload.isAdmin ? true : false;
      state.loading = false;
    },
    login(state, action: PayloadAction<ILoginForm>) {
      state.loading = true;
    },
    loginSuccessfully(state) {
      state.loading = false;
      state.isLoginSuccessfully = true;
    },
    loginFail(state) {
      state.loading = false;
      state.isLoginFail = true;
    },
  },
});

export const authAction = authSlice.actions;

export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectIsLoginSuccessfully = (state: RootState) =>
  state.auth.isLoginSuccessfully;
export const selectIsLoginFail = (state: RootState) => state.auth.isLoginFail;

const authReducer = authSlice.reducer;
export default authReducer;
