import * as _ from "lodash";
import { IVideo } from "../models";

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

interface IPosition {
  x: number;
  y: number;
}

export const VIDEO_VIEW_DISTRIBUTION = {
  "~100": 100,
  "~500": 500,
  "~1000": 1000,
  "~5K": 5000,
  "~10K": 10000,
  "~30K": 30000,
  "~50K": 50000,
  "~100K": 100000,
  "~200K": 200000,
  "~300K": 300000,
  "~400K": 400000,
  "~500K": 500000,
  "~1M": 1000000,
  "1.5M": 1500000,
  "~2M": 2000000,
  "~3M": 3000000,
  "~5M": 5000000,
  "~10M": 10000000,
  "~20M": 20000000,
  "~30M": 30000000,
  "~50M": 50000000,
  "75M": 75000000,
  "~100M": 100000000,
};

export const beautyNumberDisplay = (number: string) => {
  number = Math.round(+number).toString();
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

export const optimizeViewDataForChart = (video: {
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

export const optimizeSubscribesDataForChart = (channel: {
  subscribesHistory: string;
  date: string;
}) => {
  let { subscribesHistory, date } = channel;
  let subscribesList = subscribesHistory.split("|").map((v) => +v);
  subscribesList =
    subscribesList.length >= 30
      ? subscribesList.slice(subscribesList.length - 29)
      : subscribesList;
  let gapSubscribesHistory = subscribesList
    .map((v, index) => {
      if (index === subscribesList.length - 1) return -1;
      return subscribesList[index + 1] - subscribesList[index];
    })
    .slice(0, subscribesList.length - 1);

  let dateList = date
    .split("|")
    .map((d) => formatDate(d, false))
    .slice(1);

  return {
    subscribesHistory: subscribesList,
    gapSubscribesHistory,
    date: dateList,
  };
};

export const optimizeNumberVideosDataForChart = (channel: {
  numberVideosHistory: string;
  date: string;
}) => {
  let { numberVideosHistory, date } = channel;
  let numberVideosList = numberVideosHistory.split("|").map((v) => +v);
  numberVideosList =
    numberVideosList.length >= 30
      ? numberVideosList.slice(numberVideosList.length - 29)
      : numberVideosList;
  let gapNumberVideosHistory = numberVideosList
    .map((v, index) => {
      if (index === numberVideosList.length - 1) return -1;
      return numberVideosList[index + 1] - numberVideosList[index];
    })
    .slice(0, numberVideosList.length - 1);

  let dateList = date
    .split("|")
    .map((d) => formatDate(d, false))
    .slice(1);

  return {
    numberVideosHistory: numberVideosList,
    gapNumberVideosHistory,
    date: dateList,
  };
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

export const formatDuration = (duration: number): string => {
  let hours = Math.floor(duration / 3600);
  let minutes = Math.floor((duration - hours * 3600) / 60);
  let seconds = duration - hours * 3600 - minutes * 60;
  return `${hours > 0 ? `${hours} : ` : ""}${
    minutes >= 10 ? `${minutes} : ` : `0${minutes} : `
  }${seconds >= 10 ? seconds : `0${seconds}`}`;
};

export const optimizeVideoViewDistribution = (viewList: number[]) => {
  let videoViewDistribution = VIDEO_VIEW_DISTRIBUTION;
  let videoViewDistributionKey = Object.keys(viewList);
  for (let i in videoViewDistribution) {
    videoViewDistribution[i] = 0;
  }
  for (let i = 0; i < viewList.length; i++) {
    for (let j = videoViewDistributionKey.length - 1; i >= 1; i--) {
      if (
        viewList[i] <= +videoViewDistributionKey[j] &&
        viewList[i] > +videoViewDistributionKey[j - 1]
      ) {
        videoViewDistribution[j]++;
      }
      if (viewList[i] < +videoViewDistributionKey[0]) {
        videoViewDistribution[0]++;
      }
    }
  }
  return {
    data2: Object.keys(videoViewDistribution),
    data1: Object.values(videoViewDistribution),
  };
};

export const getViewsVideoDeleted = ({
  viewsHistory,
  likesHistory,
}: {
  viewsHistory: string;
  likesHistory: string;
}): { views: number; likes: number } => {
  let viewsHistoryList = viewsHistory.split("|").map((v) => +v);
  let likeHistoryList = likesHistory.split("|").map((v) => +v);
  let views = 0;
  let likes = 0;
  for (let i = viewsHistoryList.length - 1; i >= 0; i--) {
    if (viewsHistoryList[i] >= 0) {
      views = viewsHistoryList[i];
      break;
    }
  }
  for (let i = likeHistoryList.length - 1; i >= 0; i--) {
    if (likeHistoryList[i] >= 0) {
      likes = likeHistoryList[i];
      break;
    }
  }
  return { views, likes };
};

export const formatChannelTags = (tags: string): string[] => {
  let tagList: string[] = [];
  let pivotList: number[] = [];
  let _tag: string[] = [];
  for (let i in tags as any) {
    if (tags[i] === '"') pivotList.push(+i);
  }
  for (let i = 0; i < pivotList.length; i += 2) {
    let tag = tags.slice(pivotList[i] + 1, pivotList[i + 1]);
    tagList.push(tag);
    _tag.push(`"${tag}"`);
  }
  for (let i of _tag) {
    tags = tags.replace(i, "");
  }
  tagList = [...tagList, ...tags.split(" ")].filter((t) => t !== "");

  return tagList;
};

export const splitTextByKeyword = ({
  text,
  keyword,
}: {
  text: string;
  keyword: string;
}): string[] => {
  let str = text.toLowerCase();
  let kw = keyword.toLowerCase();
  let index = str.indexOf(kw);
  let start = text.slice(0, index);
  let end = text.slice(index + kw.length);
  return [start, text.slice(index, index + kw.length), end];
};

export const setCookie = (name, value, days = null) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const getCookie = (name, cookie) => {
  var nameEQ = name + "=";
  var ca = cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
