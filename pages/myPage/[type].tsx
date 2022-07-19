import { channelApi, userApi } from "@api/index";
import { useAppDispatch, useAppSelector } from "@app/index";
import { Container, HStack, Text, VStack } from "@chakra-ui/react";
import { Header } from "@component/common";
import { MyChannelPage } from "@component/container";
import { LinkMenuItem } from "@component/ui";
import { MainLayout } from "@layout/index";
import { NextPageWithLayout } from "@models/index";
import {
  selectFirebaseUser,
  selectIsFirst,
  selectUserProfile,
  userAction,
  youtubeAction,
} from "@store/index";
import { getCookie } from "@utils/index";
import { GetServerSideProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MyPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({
  type,
  userProfile,
  // channelOverview,
  isExpired,
}: {
  type;
  youtubeObject;
  userProfile;
  // channelOverview: IChannelOverview;
  isExpired: boolean;
}) => {
  const dispatch = useAppDispatch();
  const userProfileSelector = useAppSelector(selectUserProfile);
  const [isActiveChannel, setIsActiveChannel] = useState<boolean>(false);
  const isFirstSelector = useAppSelector(selectIsFirst);
  const router = useRouter();

  useEffect(() => {
    dispatch(youtubeAction.setYoutubeObject({ youtubeObject: null! }));
    dispatch(userAction.setUserProfile({ userProfile }));
    dispatch(youtubeAction.setType({ type }));
  }, []);

  useEffect(() => {
    if (isExpired) {
      dispatch(userAction.setUserProfile({ userProfile: null! }));
      router.push("/");
    }
  }, [isExpired]);

  useEffect(() => {
    if (
      userProfileSelector &&
      userProfileSelector.channel &&
      !isFirstSelector
    ) {
      dispatch(userAction.preSetUserProfile({}));
    }
  }, [userProfileSelector]);

  useEffect(() => {
    const getChannelOverview = async () => {
      const newChannelOverviews = await channelApi.getChannelOverview({
        id: userProfileSelector.channel.id,
      });
      dispatch(
        youtubeAction.setChannelOverview({
          channelOverview: newChannelOverviews
            ? newChannelOverviews.channelOverview
            : null!,
        })
      );

      newChannelOverviews && setIsActiveChannel(true);
    };
    if (
      userProfileSelector &&
      userProfileSelector.channel.isAvailable !== false &&
      isFirstSelector
    ) {
      getChannelOverview();
    }
  }, [isFirstSelector, userProfileSelector]);

  return  !isExpired ? (
    <>
      <Container maxWidth="1024px" p={0}>
        <Header title={`YoutubeData - Member`} />
        <VStack>
          <HStack mb={6} alignItems="center" justifyContent="inherit" w="100%">
            <Text as="h1" fontSize="1.5rem" fontWeight="bold" mr={7}>
              My Page
            </Text>
            <HStack>
              <LinkMenuItem
                href="/myPage/myPageOverview"
                title="Overview"
                type="myPageOverview"
                active={isActiveChannel ? true : false}
              />
              {/* <LinkMenuItem
                href="/myPage/vsTrend"
                title="vsTrend"
                type="vsTrend"
                active={channelOverview ? true : false}
              /> */}
              <LinkMenuItem
                href="/myPage/vsCompetitor"
                title="vsCompetitor"
                type="vsCompetitor"
                active={isActiveChannel ? true : false}
              />
              <LinkMenuItem
                href="/myPage/editProfile"
                title="Edit Profile"
                type="editProfile"
              />
            </HStack>
          </HStack>
          <MyChannelPage />
        </VStack>
      </Container>
    </>
  ) : null;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const token = req.headers.cookie
    ? (getCookie("token", req.headers.cookie) as string)
    : ("" as string);
  const { type } = query;
  if (
    typeof type === "string" &&
    !["myPageOverview", "vsTrend", "vsCompetitor", "editProfile"].includes(type)
  )
    return { notFound: true };

  const userProfile = await userApi.getUserProfile({
    config: { headers: { Authorization: token } },
  });

  if (!userProfile) return { props: { isExpired: true } };

  return {
    props: {
      type,
      youtubeObject: null,
      userProfile,
    },
  };
};

MyPage.Layout = MainLayout;

export default MyPage;
//https://www.redtoolbox.io/
