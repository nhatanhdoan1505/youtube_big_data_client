import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IChannel, IPayload } from "../../models";

const initialState: {
  channels: IChannel[];
  channel: IChannel;
  loading: boolean;
  message: string;
  labels: string[];
} = {
  channels: [],
  channel: null!,
  loading: false,
  message: "",
  labels: [],
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    queryAllChannel(state) {},
    deleteChannel(state, action: PayloadAction<string>) {},
    deleteChannelSuccessfully(state, action: PayloadAction<IChannel[]>) {
      console.log("aaa", action.payload);
      state.channels = action.payload;
      state.labels = state.channels.map((c) => c.label);
    },
    getAllChannel(state, action: PayloadAction<IChannel[]>) {
      state.channels = action.payload;
      state.labels = state.channels.map((c) => c.label);
    },
    getByLabel(state, action: PayloadAction<IPayload>) {
      state.loading = true;
    },
    getByLabelSuccess(state, action: PayloadAction<IChannel[]>) {
      state.loading = false;
      state.channels = action.payload;
    },
    getChannelFail(state, action: PayloadAction) {
      state.loading = false;
    },
    getById(state, action: PayloadAction<IChannel>) {
      state.channel = action.payload;
    },
    getByIdSuccess(state, action: PayloadAction<IChannel>) {
      state.loading = false;
      state.channel = action.payload;
    },
  },
});

export const channelAction = channelSlice.actions;

export const selectChannels = (state: RootState) => state.channel.channels;
export const selectChannel = (state: RootState) => state.channel.channel;
export const selectLoading = (state: RootState) => state.channel.loading;
export const selectMessage = (state: RootState) => state.channel.message;
export const selectLabel = (state: RootState) => state.channel.labels;

const channelReducer = channelSlice.reducer;
export default channelReducer;
