import { channelApi } from "@api/index";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  Box,
  Container,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Header } from "@component/common";
import { ChannelInformation, ChannelOverview } from "@component/container";
import { LinkMenuItem } from "@component/ui";
import { MainLayout } from "@layout/index";
import { IChannelOverview, NextPageWithLayout } from "@models/index";
import { youtubeAction } from "@store/index";
import { GetServerSideProps, InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import { selectChannelOverview } from "@store/index";

const ChannelInformationPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({
  type,
  channelOverview,
}: {
  type: never;
  channelOverview: IChannelOverview;
}) => {
  const dispatch = useAppDispatch();
  const channelOverviewSelector = useAppSelector(selectChannelOverview);

  useEffect(() => {
    dispatch(youtubeAction.setYoutubeObject({ youtubeObject: null! }));
    dispatch(youtubeAction.setType({ type }));
    dispatch(youtubeAction.setChannelOverview({ channelOverview }));
  }, []);

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
              <Link
                href={`https://www.youtube.com/channel/${channelOverview.id}`}
                target="_blank"
              >
                <Text fontWeight="bold">{channelOverview.title}</Text>
              </Link>
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
  const { id, type } = query;
  if (
    typeof type === "string" &&
    ![
      "overview",
      "topVideo",
      "allVideo",
      // "dailyStat",
      // "history",
      "videoHistory",
      "about",
    ].includes(type)
  )
    return { notFound: true };

  if (typeof id === "string") {
    const channelOverview = await channelApi.getChannelOverview({ id: id });
    if (!channelOverview.isExist) return { notFound: true };
    return {
      props: { type, channelOverview: channelOverview.channelOverview },
    };
  }
  return { notFound: true };
};

ChannelInformationPage.Layout = MainLayout;

export default ChannelInformationPage;
