import { RootState } from "@app/index";
import { SocketClient } from "@models/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAdminPayload {
  loading?: boolean;
}

interface IInitState {
  loading: boolean;
}

const initialState: IInitState = {
  loading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<IAdminPayload>) => {
      state.loading = action.payload.loading!;
    },
  },
});

export const adminAction = adminSlice.actions;

export const selectAdminLoading = (state: RootState) => state.admin.loading;

export const adminReducer = adminSlice.reducer;
