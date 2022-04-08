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
  bannerExternalUrl: string;
  publishedAt: string;
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
  duration: string;
  description: string;
  tags: string[];
}

export interface ISortChannelResponse {
  channelList: ISortChannel[];
  totalPage: number;
  pageNumber: number;
}

export interface IChannelInformationResponse {
  channel: ISortChannel;
}
export interface ISortChannel extends IChannel {
  gapViews: number;
  gapSubscribes: number;
  gapNumberVideos: number;
  viewsHistory: string;
  subscribesHistory: string;
  numberVideosHistory: string;
}

export interface ISortVideoResponse {
  videoList?: [ISortVideo];
  totalPage?: number;
  pageNumber?: number;
}

export interface IVideoListOverviewResponse {
  videoList: [ISortVideo];
  videoViewsDistribution: {
    label: string[];
    videoCount: number[];
  };
}

export interface IVideoViewsDistributionResponse {
  videoViewsDistribution: {
    [key: number]: number;
  };
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
    id: string;
    subscribe: string;
    views: string;
    title: string;
    numberVideos: string;
    date: string;
    channelThumbnail: string;
    bannerExternalUrl: string;
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
  type?:
    | "views"
    | "likes"
    | "commentCount"
    | "gapViews"
    | "subscribe"
    | "numberVideos"
    | "gapSubscribes"
    | "gapNumberVideos";
  pageNumber?: number;
  id?: string;
}

export interface IChannelOverviewPayload {
  id: string;
}
export interface IChannelOverview extends ISortChannel {
  viewsPerDay: number;
  subscribePerDay: number;
  durationPerVideo: number;
  uploadPerWeek: number;
  subscribeGrowPer10K: number;
  rankVideoViews: number;
  rankSubscribe: number;
}
export interface IChannelOverviewResponse {
  isExist: boolean;
  channelOverview?: IChannelOverview;
}

export interface ITagsEntry {
  tags: number;
}
export interface IChannelTagsResponse {
  tagsList: ITagsEntry[];
}
