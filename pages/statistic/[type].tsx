import { useAppDispatch } from "@app/index";
import { Box, Container, HStack, VStack, Text } from "@chakra-ui/react";
import { Header } from "@component/common";
import { MainLayout } from "@layout/index";
import { NextPageWithLayout } from "@models/index";
import { youtubeAction } from "@store/index";
import { GetServerSideProps, InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import { Statistic } from "@component/container";
import { LinkMenuItem } from "@component/ui";

const StatisticPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({ type }: { type: never }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(youtubeAction.setYoutubeObject({ youtubeObject: "statistic" }));
    dispatch(youtubeAction.setType({ type }));
  }, []);

  return (
    <>
      <Container maxWidth="1024px" p={0}>
        <Header title={`YoutubeData - Statistic`} />
        <HStack mb={6} alignItems="center" justifyContent="inherit">
          <Text as="h1" fontSize="1.5rem" fontWeight="bold" mr={7}>
            Statistics
          </Text>
          <HStack>
            <LinkMenuItem
              href="/statistic/videoDuration/"
              title="Video Duration"
              type="videoDuration"
            />
            <LinkMenuItem
              href="/statistic/videoView/"
              title="Video Views"
              type="videoView"
            />
            <LinkMenuItem
              href="/statistic/tagsTrend/"
              title="Tags Trend"
              type="tagsTrend"
            />
            <LinkMenuItem
              href="/statistic/upload/"
              title="Upload"
              type="upload"
            />
            <LinkMenuItem
              href="/statistic/channelSubscriber/"
              title="Subscriber"
              type="channelSubscriber"
            />
            {/* <LinkMenuItem
              href="/statistic/totalView/"
              title="Total View"
              type="totalView"
            />
            <LinkMenuItem
              href="/statistic/thumbnail/"
              title="Thumbnail"
              type="thumbnail"
            /> */}
          </HStack>
        </HStack>
        <Statistic />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { type } = query;
  if (
    typeof type === "string" &&
    ![
      "videoDuration",
      "videoView",
      "tagsTrend",
      "upload",
      "channelSubscriber",
      "totalView",
      "thumbnail",
    ].includes(type)
  )
    return { notFound: true };

  return {
    props: {
      type,
    },
  };
};

StatisticPage.Layout = MainLayout;

export default StatisticPage;
