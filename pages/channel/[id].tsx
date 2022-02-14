import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import VideoView from "../../features/channel/components/VideoView";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
  channelAction,
  selectChannel,
} from "../../features/channel/channelSlice";
import { NextPage, NextPageContext } from "next";
import { Header } from "../../component/common/Header";

const ChannelInfor: NextPage<any> = ({ query }) => {
  const [channelId, setChannelId] = useState<string>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    let { id } = query;
    setChannelId(
      typeof id === "object" ? id[0] : typeof id === "undefined" ? "" : id
    );
  }, []);

  useEffect(() => {
    channelId && dispatch(channelAction.getChannelById(channelId));
  }, [channelId]);

  return (
    <>
      <Header title="Video" />
      <VideoView />
    </>
  );
};

ChannelInfor.getInitialProps = (ctx: NextPageContext) => {
  return { query: ctx.query };
};

export default ChannelInfor;
