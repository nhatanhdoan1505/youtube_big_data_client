import { Header } from "@component/common";
import { HeroSection, HotTable } from "@component/container";
import { MainLayout } from "@layout/index";
import { NextPageWithLayout } from "@models/index";

const Home: NextPageWithLayout<null> = () => {
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
