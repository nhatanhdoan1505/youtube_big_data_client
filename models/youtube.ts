export interface IChannel {
  _id: string;
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
  description: string;
  videoList: [IVideo];
  tags: string;
  isAvailable: boolean;
}

export interface IVideo {
  _id: string;
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

export interface IChannelLabelResponse {
  labelList: string[];
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

export interface IChannelUploadStatisticResponse {
  channelUploadStatistics: IChannelUploadStatistic;
  channelUploadAverage: IChannelUploadAverage;
}

export interface IChannelUploadStatistic {
  [key: number]: { [key: string]: number };
}

export interface IChannelUploadAverage {
  [key: number]: number;
}

export interface IVideoViewAverageResponse {
  averageVideoView: number;
}
export interface IVideoViewsStatistic {
  [key: number]: number;
}
export interface IVideoViewsStatisticResponse {
  videoViews: IVideoDurationStatistic;
}

export interface IChannelSubscriberAverageResponse {
  averageChannelSubscriber: number;
}
export interface IChannelSubscriberStatistic {
  [key: number]: number;
}
export interface IChannelSubscriberStatisticResponse {
  channelSubscriber: IVideoDurationStatistic;
}

export interface IVideoDurationStatistic {
  [key: number]: number;
}
export interface IVideoDurationStatisticResponse {
  videoDurationStatistics: IVideoDurationStatistic;
  recommendedDuration: string;
  averageViewsRecommendedDuration: string;
}

export interface IVideoTagsStatisticResponse {
  videoTagsStatistics: IVideoTagsStatistic;
  averageViewsRecommendedTags: number;
  recommendedTags: number;
}

export interface IVideoTagsStatistic {
  [key: string]: number;
}
export interface IVideoTagsSortResponse {
  tagsList: [IVideoTagsAndKeywordSort];
  keywordList: [IVideoTagsAndKeywordSort];
}

export interface IVideoTagsAndKeywordSort {
  _id: string;
  count: number;
}

export interface IVideoTagsSortPosition extends IVideoTagsAndKeywordSort {
  top: number;
  left: number;
  fontSize: number;
  color: string;
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
    description: string;
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
  allVideoSortType?: "newest" | "oldest" | "popular";
  pageNumber?: number;
  id?: string;
  tag?: string;
  keyword?: string;
  duration?: number;
  viewScope?: number[];
  numberTags?: number;
  subscribersGap?: number[];
  uploadGap?: number[];
  subscribeScope?: number[];
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
