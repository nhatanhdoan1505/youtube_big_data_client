export interface IChannel {
  label: string;
  urlChannel: string;
  id: string;
  subscribe: string;
  views: string;
  title: string;
  stringVideos: string;
  date: string;
  channelThumbnail: string;
  numberVideos: string;
  videoList: [IVideo];
}

export interface IVideo {
  thumbnail: string;
  id: string;
  title: string;
  publicAt: string;
  days: string;
  likes: string;
  dislikes: string;
  views: string;
  date: string;
  commentCount: string;
}

export interface ISortChannelResponse {
  channelList: ISortChannel[];
  totalPage: number;
  pageNumber: number;
}

export interface ISortChannel extends IChannel {
  gapViews: string;
  gapSubscribes: string;
  gapsNumberVideos: string;
  viewsHistory: string;
  subscribesHistory: string;
  numberVideosHistory: string;
}

export interface ISortVideoResponse {
  videoList: [ISortVideo];
  totalPage: number;
  pageNumber: number;
}

export interface ISortVideo extends IVideo {
  gapViews: string;
  gapLikes: string;
  gapDislikes: string;
  gapCommentsCount: string;
  commentCountHistory: string;
  viewsHistory: string;
  likesHistory: string;
  dislikesHistory: string;
  channelInformation: {
    urlChannel: string;
    title: string;
  };
}

export interface ITotal {
  totalVideos?: number;
  totalChannels?: number;
  totalPage: number;
}

export interface ISystemStat {
  views: number;
  subscribers: number;
  numberVideos: number;
  numberChannels: number;
}

export interface ISortDataPayload {
  type:
    | "views"
    | "likes"
    | "commentCount"
    | "gapSubscribes"
    | "subscribe"
    | "gapViews";
  pageNumber: number;
}
