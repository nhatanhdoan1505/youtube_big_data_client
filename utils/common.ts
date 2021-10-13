import { IChannel } from "../models";
import * as _ from "lodash";
import * as moment from "moment";

export const optimizeChannel = (channels: IChannel[]) =>
  channels.map((c) => {
    let { views, subscribe, numberVideos } = c;
    let gapViews = views.includes("|")
      ? (
          +_.nth(views.split("|"), -1)! - +_.nth(views.split("|"), -2)!
        ).toString()
      : "New";
    let gapSubcribe = subscribe.includes("|")
      ? (
          +_.nth(subscribe.split("|"), -1)! - +_.nth(subscribe.split("|"), -2)!
        ).toString()
      : "New";
    let gapNumberVideos = numberVideos.includes("|")
      ? (
          +_.nth(numberVideos.split("|"), -1)! -
          +_.nth(numberVideos.split("|"), -2)!
        ).toString()
      : "New";

    views = _.nth(views.split("|"), -1)!;
    subscribe = _.nth(subscribe.split("|"), -1)!;
    numberVideos = _.nth(numberVideos.split("|"), -1)!;
    return {
      ...c,
      gapViews,
      gapSubcribe,
      gapNumberVideos,
      views,
      subscribe,
      numberVideos,
    };
  });

export const getPreviousChannelStatictis = (channels: IChannel[]) =>
  channels
    .filter((c) => c.date.split("|").length < 2)
    .map((c) => {
      let { views, subscribe, numberVideos } = c;
      views = _.nth(views.split("|"), -2)!;
      subscribe = _.nth(subscribe.split("|"), -2)!;
      numberVideos = _.nth(numberVideos.split("|"))!;
      return {
        ...c,
        views,
        subscribe,
        numberVideos,
      };
    });

export const sortChannel = (
  channelData: IChannel[],
  sortBy:
    | "gapNumberVideos"
    | "gapViews"
    | "gapSubcribe"
    | "subscribe"
    | "numberVideos"
    | "views",
  isDescending: boolean
) => {
  const cleanChannelData = optimizeChannel(channelData);
  if (!sortBy.includes("gap")) {
    const sortChannelData = isDescending
      ? cleanChannelData.sort((a, b) => +b[sortBy] - +a[sortBy])
      : cleanChannelData.sort((a, b) => +a[sortBy] - +b[sortBy]);
    return sortChannelData;
  }
  const newChannels = cleanChannelData.filter((c) => c.gapViews === "NEW");
  const oldChannels = cleanChannelData.filter((c) => c.gapViews !== "NEW");
  const sortChannelData = isDescending
    ? oldChannels.sort((a, b) => +b[sortBy] - +a[sortBy])
    : oldChannels.sort((a, b) => +a[sortBy] - +b[sortBy]);
  return [...sortChannelData, ...newChannels];
};

export const beautyNumberDisplay = (number: string) => {
  if (!number) return "-1";
  const indexStart = number.length % 3;
  let beautyNumber = "";

  let pivot = 0;
  for (let i = indexStart; i < number.length; i += 3) {
    beautyNumber += `${number.slice(pivot, i)},`;
    pivot = i;
  }
  beautyNumber += `${number.slice(pivot)}`;
  beautyNumber = beautyNumber[0] === "," ? beautyNumber.slice(1) : beautyNumber;
  return beautyNumber;
};

export const formatDate = (date: string) =>
  moment.default(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
