import { IChannel, IVideo } from "../models";
import * as _ from "lodash";

const HTML_ENTITIES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&cent;": "¢",
  "&pound;": "£",
  "&yen;": "¥",
  "&euro;": "€",
  "&copy;": "©",
  "&reg;": "®",
  "&nbsp;": "",
};

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

export const formatDate = (dateString: string, full = true) => {
  const t = new Date(dateString);
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  const hours = ("0" + t.getHours()).slice(-2);
  const minutes = ("0" + t.getMinutes()).slice(-2);
  const seconds = ("0" + t.getSeconds()).slice(-2);
  return full
    ? `${date}/${month}/${year}, ${hours}:${minutes}:${seconds}`
    : `${date}/${month}/${year}`;
};

export const optimizeVideoData = (video: IVideo[]) => {
  const videoData = video.map((v) => {
    let { views } = v;
    let gapViews =
      views.split("|").length === 1
        ? "NEW"
        : (
            +_.nth(views.split("|"), -1)! - +_.nth(views.split("|"), -2)!
          ).toString();
    views = _.nth(views.split("|"), -1)!;

    return { ...v, views, gapViews };
  });
  return videoData;
};

export const optimizeVideoDataForChart = (video: {
  viewsHistory: string;
  date: string;
}) => {
  let { viewsHistory, date } = video;
  let viewsList = viewsHistory.split("|").map((v) => +v);
  viewsList =
    viewsList.length >= 30 ? viewsList.slice(viewsList.length - 29) : viewsList;
  let gapViewsHistory = viewsList
    .map((v, index) => {
      if (index === viewsList.length - 1) return -1;
      return viewsList[index + 1] - viewsList[index];
    })
    .slice(0, viewsList.length - 1);

  let dateList = date
    .split("|")
    .map((d) => formatDate(d, false))
    .slice(1);

  return { viewsHistory: viewsList, gapViewsHistory, date: dateList };
};

export const getMinAndMax = (list: number[]) => {
  return { min: _.min(list), max: _.max(list) };
};

export const sortVideo = (
  videoList: IVideo[],
  sortBy: "gapViews" | "views",
  isDescending: boolean
) => {
  const optimizeVideo = optimizeVideoData(videoList);
  if (!sortBy.includes("gap")) {
    const sortChannelData = isDescending
      ? optimizeVideo.sort((a, b) => +b[sortBy] - +a[sortBy])
      : optimizeVideo.sort((a, b) => +a[sortBy] - +b[sortBy]);
    return sortChannelData;
  }
  const newVideos = optimizeVideo.filter((c) => c.gapViews === "NEW");
  const oldVideos = optimizeVideo.filter((c) => c.gapViews !== "NEW");

  const sortChannelData = isDescending
    ? oldVideos.sort((a, b) => +b[sortBy] - +a[sortBy])
    : oldVideos.sort((a, b) => +a[sortBy] - +b[sortBy]);
  return [...sortChannelData, ...newVideos];
};

export const range = (start: number, end: number) => {
  if (start > end) return [];
  if (start === end) return [start];
  return Array.from({ length: end + 1 - start }, (v, k) => k + start);
};

export const removeHtmlEntities = (str: string) => {
  Object.keys(HTML_ENTITIES).map((e) => {
    str = str.replace(new RegExp(e, "g"), HTML_ENTITIES[e]);
  });
  return str;
};
