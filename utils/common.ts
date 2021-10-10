import { IChannel } from "../models";
import * as _ from "lodash";

export const optimizeChannel = (channels: IChannel[]) =>
  channels.map((c) => {
    let { views, subscribe, numberVideos } = c;
    let gapViews = views.includes("|")
      ? (
          +_.nth(views.split("|"), -1)! - +_.nth(views.split("|"), -2)!
        ).toString()
      : "*";
    let gapSubcribe = subscribe.includes("|")
      ? (
          +_.nth(subscribe.split("|"), -1)! - +_.nth(subscribe.split("|"), -2)!
        ).toString()
      : "*";
    let gapNumberVideos = numberVideos.includes("|")
      ? (
          +_.nth(numberVideos.split("|"), -1)! -
          +_.nth(numberVideos.split("|"), -2)!
        ).toString()
      : "*";

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
