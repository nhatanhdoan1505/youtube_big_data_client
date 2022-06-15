import { videoApi } from "@api/index";
import { useAppDispatch, useAppSelector } from "@app/index";
import { HStack, Text } from "@chakra-ui/react";
import { Header } from "@component/common";
import { TableContainerFull } from "@component/container";
import { LinkMenuItem, TableVideo } from "@component/ui";
import { MainLayout } from "@layout/index";
import { NextPageWithLayout } from "@models/index";
import {
  selectLoading,
  selectPageNumber,
  selectSortType,
  selectYoutubeObject,
  youtubeAction,
} from "@store/index";
import { getCookie } from "@utils/index";
import { GetServerSideProps, InferGetStaticPropsType } from "next";
import { useEffect } from "react";

const SortVideos: NextPageWithLayout<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({ pageNumber, totalPage, type, youtubeObject }) => {
  const dispatch = useAppDispatch();
  const pageNumberSelector = useAppSelector(selectPageNumber);
  const sortTypeSelector = useAppSelector(selectSortType);
  const loadingSelector = useAppSelector(selectLoading);
  const youtubeObjectSelector = useAppSelector(selectYoutubeObject);

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

  useEffect(() => {
    if (
      ["views", "likes", "commentCount", "gapViews"].includes(
        sortTypeSelector
      ) &&
      youtubeObjectSelector === "video" &&
      !loadingSelector
    )
      dispatch(
        youtubeAction.preSetVideoSortList({
          type: sortTypeSelector,
          pageNumber: pageNumberSelector,
        })
      );
  }, [pageNumberSelector, sortTypeSelector]);

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

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const token = getCookie("token", req.headers.cookie) as string;
  const { pageNumber, type } = query;
  if (!+pageNumber!) return { notFound: true };
  if (
    typeof type === "string" &&
    !["views", "likes", "commentCount", "gapViews"].includes(type)
  )
    return { notFound: true };

  const { totalPage } = await videoApi.getTotalSortVideos({
    config: { headers: { Authorization: token } },
  });
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
