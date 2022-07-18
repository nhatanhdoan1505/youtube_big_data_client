import { userApi } from "@api/index";
import { Header } from "@component/common";
import { Admin } from "@component/container";
import { socket, SocketContext } from "@context/socket";
import { NextPageWithLayout } from "@models/index";
import { getCookie } from "@utils/common";
import { GetServerSideProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({ isDirectLogin, isDirectHome, isAdmin }) => {
  const router = useRouter();

  const render = isAdmin ? (
    <>
      <SocketContext.Provider value={socket}>
        <Header title="YoutubeData - Admin" />
        <Admin />
      </SocketContext.Provider>
    </>
  ) : null;

  useEffect(() => {
    const redirect = () => {
      if (isAdmin) return;
      if (isDirectLogin) return router.push("/login");
      if (isDirectHome) return router.push("/");
    };
    redirect();
  }, []);

  return render;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.headers.cookie
    ? (getCookie("token", req.headers.cookie) as string)
    : ("" as string);
  const userProfile = await userApi.getUserProfile({
    config: { headers: { Authorization: token } },
  });

  if (!userProfile)
    return {
      props: { isDirectLogin: true, isDirectHome: false, isAdmin: false },
    };
  if (userProfile && !userProfile.isAdmin)
    return {
      props: { isDirectLogin: false, isDirectHome: true, isAdmin: false },
    };
  return {
    props: { isDirectLogin: false, isDirectHome: false, isAdmin: true },
  };
};

export default AdminPage;
//https://www.redtoolbox.io/
