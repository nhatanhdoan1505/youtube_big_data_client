import { videoApi } from "@api/index";
import { useAppDispatch } from "@app/index";
import { HStack, Text } from "@chakra-ui/react";
import { Header } from "@component/common";
import { TableContainerFull } from "@component/container";
import { LinkMenuItem, TableVideo } from "@component/ui";
import { MainLayout } from "@layout/index";
import { NextPageWithLayout } from "@models/index";
import { youtubeAction } from "@store/index";
import { GetServerSideProps, InferGetStaticPropsType } from "next";
import { useEffect } from "react";

const SortVideos: NextPageWithLayout<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({ pageNumber, totalPage, type, youtubeObject }) => {
  const dispatch = useAppDispatch();

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
            href="/topList/video/views/"
            title="Most Views"
            type="views"
          />
          <LinkMenuItem
            href="/topList/video/likes/"
            title="Most Likes"
            type="likes"
          />
          <LinkMenuItem
            href="/topList/video/commentCount/"
            title="Most Comments"
            type="commentCount"
          />
          <LinkMenuItem
            href="/topList/video/gapViews/"
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
  if (+pageNumber! > totalPage) return { notFound: true };
  return {
    props: {
      pageNumber,
      totalPage,
      type,
      youtubeObject: "video",
    },
  };
};

SortVideos.Layout = MainLayout;

export default SortVideos;
