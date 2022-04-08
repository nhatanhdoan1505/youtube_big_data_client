import { useAppDispatch } from "@app/index";
import { Header } from "@component/common";
import { HeroSection, HotTable } from "@component/container";
import { MainLayout } from "@layout/index";
import { NextPageWithLayout } from "@models/index";
import { youtubeAction } from "@store/index";
import { useEffect } from "react";

const Home: NextPageWithLayout<null> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(youtubeAction.setYoutubeObject({ youtubeObject: null! }));
  }, []);
  return (
    <>
      <Header title="YoutubeData - Home" />
      <HeroSection />
      <HotTable />
    </>
  );
};

Home.Layout = MainLayout;

export default Home;
//https://www.redtoolbox.io/
