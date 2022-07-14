import { useAppSelector } from "@app/index";
import { Header } from "@component/common";
import { Login } from "@component/container";
import { NextPageWithLayout } from "@models/index";
import { selectUserProfile } from "@store/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LoginPage: NextPageWithLayout<null> = () => {
  const [isSign, setIsSignIn] = useState<boolean>(true);
  const userProfileSelector = useAppSelector(selectUserProfile);
  const router = useRouter();

  const render = !isSign ? (
    <>
      <>
        <Header title="YoutubeData - Login" />
        <Login />
      </>
    </>
  ) : null;

  useEffect(() => {
    if (userProfileSelector) {
      if (userProfileSelector.isAdmin) {
        setIsSignIn(true);
        router.push("/admin");
        return;
      }
      setIsSignIn(true);
      router.push("/");
      return;
    }
    setIsSignIn(false);
  }, []);

  return render;
};

export default LoginPage;
//https://www.redtoolbox.io/
