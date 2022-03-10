import { videoApi } from "@api/index";
import { useAppDispatch, useAppSelector } from "@app/index";
import { HStack, Link, Text } from "@chakra-ui/react";
import { Header } from "@component/common";
import { TableContainerFull } from "@component/container";
import { TableVideo } from "@component/ui";
import { MainLayout } from "@layout/index";
import { NextPageWithLayout } from "@models/index";
import { selectPageNumber, selectSortType, youtubeAction } from "@store/index";
import { GetServerSideProps, InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import { LinkMenuItem } from "@component/ui";

const SortVideos: NextPageWithLayout<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({ pageNumber, totalPage, type }) => {
  const dispatch = useAppDispatch();
  const pageNumberSelector = useAppSelector(selectPageNumber);
  const typeSelector = useAppSelector(selectSortType);

  useEffect(() => {
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
            href="/topList/topVideo/views/"
            title="Most Views"
            type="views"
          />
          <LinkMenuItem
            href="/topList/topVideo/likes/"
            title="Most Likes"
            type="likes"
          />
          <LinkMenuItem
            href="/topList/topVideo/commentCount/"
            title="Most Comments"
            type="commentCount"
          />
          <LinkMenuItem
            href="/topList/topVideo/gapViews/"
            title="Hot Now"
            type="gapViews"
          />
        </HStack>
      </HStack>
      <TableContainerFull>
        <TableVideo />
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
    !["views", "likes", "commentCount", "gapViews"].includes(type)
  )
    return { notFound: true };

  const { totalPage } = await videoApi.getTotalSortVideos();
  return {
    props: {
      pageNumber,
      totalPage,
      type,
    },
  };
};

SortVideos.Layout = MainLayout;

export default SortVideos;
