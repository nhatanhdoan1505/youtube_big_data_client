import { channelApi } from "@api/index";
import { useAppDispatch, useAppSelector } from "@app/index";
import { Box, Container, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Header } from "@component/common";
import { ChannelInformation } from "@component/container";
import { LinkMenuItem } from "@component/ui";
import { MainLayout } from "@layout/index";
import { IChannelOverview, NextPageWithLayout } from "@models/index";
import {
  selectAllVideoSortType,
  selectChannelOverview,
  selectLoading,
  selectPageNumber,
  selectSortType,
  selectYoutubeObject,
  youtubeAction,
} from "@store/index";
import { GetServerSideProps, InferGetStaticPropsType } from "next";
import { useEffect } from "react";

const ChannelVideoListPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({
  type,
  channelOverview,
  totalPage,
  pageNumber,
  allVideoSortType,
}: {
  type: never;
  channelOverview: IChannelOverview;
  totalPage: number;
  pageNumber: number;
  allVideoSortType: "oldest" | "newest" | "popular";
}) => {
  const dispatch = useAppDispatch();
  const channelOverviewSelector = useAppSelector(selectChannelOverview);
  const pageNumberSelector = useAppSelector(selectPageNumber);
  const sortTypeSelector = useAppSelector(selectSortType);
  const youtubeObjectSelector = useAppSelector(selectYoutubeObject);
  const allVideoSortTypeSelector = useAppSelector(selectAllVideoSortType);
  const loadingSelector = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(youtubeAction.setYoutubeObject({ youtubeObject: null! }));
    dispatch(youtubeAction.setType({ type }));
    dispatch(youtubeAction.setChannelOverview({ channelOverview }));
    dispatch(
      youtubeAction.setPagination({
        pageNumber,
        totalPage,
      })
    );
    if (allVideoSortType) {
      dispatch(youtubeAction.setAllVideoSortType({ allVideoSortType }));
    }
  }, []);

  useEffect(() => {
    if (
      !youtubeObjectSelector &&
      channelOverviewSelector &&
      ["topVideo", "allVideo"].includes(sortTypeSelector) &&
      !loadingSelector
    ) {
      if (sortTypeSelector === "allVideo" && allVideoSortTypeSelector) {
        dispatch(
          youtubeAction.preSetVideoSortList({
            type: sortTypeSelector,
            allVideoSortType: allVideoSortTypeSelector,
            pageNumber: pageNumberSelector,
            id: channelOverviewSelector.id,
          })
        );
        return;
      }
      if (sortTypeSelector === "topVideo") {
        dispatch(
          youtubeAction.preSetVideoSortList({
            type: sortTypeSelector,
            pageNumber: pageNumberSelector,
            id: channelOverviewSelector.id,
          })
        );
        return;
      }
    }
  }, [
    sortTypeSelector,
    channelOverviewSelector,
    allVideoSortTypeSelector,
    youtubeObjectSelector,
    pageNumberSelector,
  ]);

  const renderPage = (
    <>
      <Container maxWidth="1024px" p={0}>
        <Header title={`YoutubeData - ${channelOverview.title}`} />
        <VStack>
          <Box
            w="100%"
            height="169px"
            display="block"
            backgroundImage={`url(${channelOverview.bannerExternalUrl})`}
            backgroundPosition="center"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            border="1px solid #eaeaea"
            my={2}
          />
          <HStack justifyContent="space-between" w="100%" alignItems="center">
            <HStack justifyContent="center" alignItems="center">
              <Image
                src={channelOverview.channelThumbnail}
                alt={channelOverview.title}
                maxWidth="60px"
                maxHeight="60px"
                borderRadius="50%"
              />
              <Text fontWeight="bold">{channelOverview.title}</Text>
            </HStack>
            <HStack>
              <LinkMenuItem
                href={`/channel/overview/${channelOverview.id}/`}
                title="Overview"
                type="overview"
              />
              <LinkMenuItem
                href={`/channel/topVideo/${channelOverview.id}/`}
                title="Top Videos"
                type="topVideo"
              />
              <LinkMenuItem
                href={`/channel/allVideo/${channelOverview.id}/`}
                title="All Videos"
                type="allVideo"
              />
              {/* <LinkMenuItem
                href={`/channel/dailyStat/${channelOverview.id}/`}
                title="Daily Stat"
                type="dailyStat"
              /> */}
              {/* <LinkMenuItem
                href={`/channel/overview/${channelOverview.id}/`}
                title="History"
                type="history"
              /> */}
              <LinkMenuItem
                href={`/channel/videoHistory/${channelOverview.id}/`}
                title="Video History"
                type="videoHistory"
              />
              <LinkMenuItem
                href={`/channel/about/${channelOverview.id}/`}
                title="About"
                type="about"
              />
            </HStack>
          </HStack>
          {channelOverviewSelector ? <ChannelInformation /> : null}
        </VStack>
      </Container>
    </>
  );

  return renderPage;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id, type, pageNumber } = query;
  if (typeof type === "string" && !["topVideo", "allVideo"].includes(type))
    return { notFound: true };

  if (typeof id === "string") {
    const channelOverview = await channelApi.getChannelOverview({ id: id });

    if (!channelOverview.isExist) return { notFound: true };

    const { totalPage } = await channelApi.getTotalVideo({ id });
    if (+pageNumber! > totalPage) return { notFound: true };

    if (
      query.allVideoSortType &&
      !["oldest", "newest", "popular"].includes(
        query.allVideoSortType as string
      )
    )
      return { notFound: true };

    return {
      props: {
        pageNumber,
        totalPage,
        type,
        allVideoSortType: query.allVideoSortType
          ? query.allVideoSortType
          : "newest",
        channelOverview: channelOverview.channelOverview,
      },
    };
  }

  return { notFound: true };
};

ChannelVideoListPage.Layout = MainLayout;

export default ChannelVideoListPage;
