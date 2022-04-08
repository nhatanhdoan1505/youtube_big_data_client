import { channelApi } from "@api/index";
import { useAppDispatch, useAppSelector } from "@app/index";
import { HStack, Text } from "@chakra-ui/react";
import { Header } from "@component/common";
import { TableContainerFull } from "@component/container";
import { LinkMenuItem, TableChannel } from "@component/ui";
import { MainLayout } from "@layout/index";
import { NextPageWithLayout } from "@models/index";
import { selectPageNumber, selectSortType, youtubeAction } from "@store/index";
import { GetServerSideProps, InferGetStaticPropsType } from "next";
import { useEffect } from "react";

const SortChannels: NextPageWithLayout<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({ pageNumber, totalPage, type, youtubeObject }) => {
  const dispatch = useAppDispatch();
  const pageNumberSelector = useAppSelector(selectPageNumber);
  const typeSelector = useAppSelector(selectSortType);

  useEffect(() => {
    dispatch(youtubeAction.setYoutubeObject({ youtubeObject }));
    dispatch(
      youtubeAction.setPagination({
        pageNumber,
        totalPage,
        type,
      })
    );
  }, []);

  const renderPage = pageNumber ? (
    <>
      <Header title="YoutubeData - Top List" />
      <HStack mb={6} alignItems="center" justifyContent="inherit">
        <Text as="h1" fontSize="1.5rem" fontWeight="bold" mr={7}>
          Top Videos
        </Text>
        <HStack>
          <LinkMenuItem
            href="/topList/channel/views/"
            title="Most Views"
            type="views"
          />
          <LinkMenuItem
            href="/topList/channel/subscribe/"
            title="Most Subscribers"
            type="subscribe"
          />
          <LinkMenuItem
            href="/topList/channel/numberVideos/"
            title="Most Number Videos"
            type="numberVideos"
          />
          <LinkMenuItem
            href="/topList/channel/gapSubscribes/"
            title="Mot Increased Subscribers"
            type="gapSubscribes"
          />
          <LinkMenuItem
            href="/topList/channel/gapViews/"
            title="Most Increased Views"
            type="gapViews"
          />
          <LinkMenuItem
            href="/topList/channel/gapNumberVideos/"
            title="Most Increased Videos"
            type="gapNumberVideos"
          />
        </HStack>
      </HStack>
      <TableContainerFull>
        <TableChannel />
      </TableContainerFull>
    </>
  ) : null;

  return renderPage;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { pageNumber, type } = query;
  if (!+pageNumber!) return { notFound: true };
  if (
    typeof type === "string" &&
    ![
      "views",
      "subscribe",
      "numberVideos",
      "gapSubscribes",
      "gapViews",
      "gapNumberVideos",
    ].includes(type)
  )
    return { notFound: true };

  const { totalPage } = await channelApi.getTotalSortChannels();
  if (+pageNumber! > totalPage) return { notFound: true };
  return {
    props: {
      pageNumber,
      totalPage,
      type,
      youtubeObject: "channel",
    },
  };
};

SortChannels.Layout = MainLayout;

export default SortChannels;
