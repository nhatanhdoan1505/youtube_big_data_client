import { channelApi, userApi } from "@api/index";
import { useAppDispatch, useAppSelector } from "@app/index";
import { Container, HStack, Text, VStack } from "@chakra-ui/react";
import { Header } from "@component/common";
import { MyChannelPage } from "@component/container";
import { LinkMenuItem } from "@component/ui";
import { MainLayout } from "@layout/index";
import { IChannelOverview, NextPageWithLayout } from "@models/index";
import { selectFirebaseUser, userAction, youtubeAction } from "@store/index";
import { getCookie } from "@utils/index";
import { GetServerSideProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MyPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({
  type,
  youtubeObject,
  userProfile,
  channelOverview,
  isExpired,
}: {
  type;
  youtubeObject;
  userProfile;
  channelOverview: IChannelOverview;
  isExpired: boolean;
}) => {
  const dispatch = useAppDispatch();
  const firebaseUserSelector = useAppSelector(selectFirebaseUser);

  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [waiter, setWaiter] = useState<any>(null!);
  const router = useRouter();

  useEffect(() => {
    dispatch(youtubeAction.setYoutubeObject({ youtubeObject: null! }));
    dispatch(userAction.setUserProfile({ userProfile }));
    dispatch(
      youtubeAction.setChannelOverview({ channelOverview: channelOverview })
    );
  }, []);

  useEffect(() => {
    if (firebaseUserSelector) {
      setIsSignIn(true);
      clearTimeout(waiter);
      return;
    }
    setWaiter(
      setTimeout(() => {
        if (firebaseUserSelector) {
          setIsSignIn(true);
          return;
        }
        router.push("/");
      }, 5000)
    );
  }, [firebaseUserSelector]);

  useEffect(() => {
    if (isSignIn) {
      dispatch(youtubeAction.setType({ type }));
      dispatch(youtubeAction.setYoutubeObject({ youtubeObject: null! }));
    }
  }, [isSignIn]);

  useEffect(() => {
    if (isExpired) {
      router.push("/");
    }
  }, [isExpired]);

  const render = isSignIn && !isExpired ? (
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
                active={channelOverview ? true : false}
              />
              <LinkMenuItem
                href="/myPage/vsTrend"
                title="vsTrend"
                type="vsTrend"
                active={channelOverview ? true : false}
              />
              <LinkMenuItem
                href="/myPage/vsCompetitor"
                title="vsCompetitor"
                type="vsCompetitor"
                active={channelOverview ? true : false}
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

  return render;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const token = getCookie("token", req.headers.cookie) as string;
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

  let channelOverview;

  if (userProfile.channel && userProfile.channel.isAvailable !== false) {
    channelOverview = await channelApi.getChannelOverview({
      id: userProfile.channel.id,
    });
  }

  return {
    props: {
      type,
      youtubeObject: null,
      userProfile,
      channelOverview: channelOverview ? channelOverview.channelOverview : null,
    },
  };
};

MyPage.Layout = MainLayout;

export default MyPage;
//https://www.redtoolbox.io/
